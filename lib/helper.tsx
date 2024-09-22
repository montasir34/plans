
'use server'
import jwt from "jsonwebtoken";
import bc from "bcrypt";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { stat, mkdir, writeFile } from "fs/promises";
import { join } from "path"
import mime from 'mime'
async function hash_password(passwordText: string) {
    return await bc.hash(passwordText, 10);
}

async function compare_password(passwordText: string, hash: string) {
    return await bc.compare(passwordText, hash);
}

export type userInfoType = Omit<User, "password" | "email" | "createdAt">;

async function generate_token(userInfo: userInfoType) {
    return await jwt.sign(userInfo, `${process.env.SECRET_KEY}`, {
        expiresIn: "1h",
    });
}

async function decode_jwt(token: string) {
    if (token === undefined) {
        return redirect("/");
    }
    try {
        // Attempt to verify the JWT using the secret key from environment variables
        const decoded = await jwt.verify(token, process.env.SECRET_KEY as string);
        if (!decoded) {
            cookies().delete('token')
            redirect('/')
        }
        return decoded;
    } catch (error) {
        redirect('/')
    }
}

// async function authorizePage() {
//     const cookiesStore = cookies();
//     const token = cookiesStore.get("token")?.value;
//     const decodedJwt = await decode_jwt(`${token}`) as userInfoType

// }

async function insure_user_authenticated() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
        redirect('/')
    }
    const decodedJwt = await decode_jwt(`${token}`) as userInfoType
    if (!decodedJwt) {
        redirect('/')
    }
    return decodedJwt
}

async function uploadFile(image: File) {
    if (!image || image.size === 0) {
        return undefined;  // Return undefined instead of null
    }
    console.log(image)
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
        .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    function isNodeErrorWithCode(error: unknown): error is NodeJS.ErrnoException {
        return typeof error === 'object' && error !== null && 'code' in error;
    }

    try {
        await stat(uploadDir);
    } catch (e: unknown) {
        // Use the type guard to check if the error has a 'code' property
        if (isNodeErrorWithCode(e) && e.code === "ENOENT") {
            // This is for checking if the directory exists (ENOENT: Error No Entry)
            await mkdir(uploadDir, { recursive: true });
        } else {
            throw new Error(
                "Error while trying to create directory when uploading a file"
            );
        }
    }

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${image.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        // Save to database
        return fileUrl
    } catch (e) {
        throw new Error('Something went wrong')
    }
}

export {
    generate_token,
    compare_password,
    decode_jwt,
    hash_password,
    insure_user_authenticated,
    uploadFile,
};

