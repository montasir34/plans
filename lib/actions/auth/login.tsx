"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
    compare_password,
    generate_token,
} from "../../../lib/helper";
import { prisma } from "@/lib/db";

async function login(formData: FormData) {
    const cookiesStore = cookies();
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    if (!username || !password) {
        throw new Error('Email and password required')
    }
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    if (user && (await compare_password(password, user.password))) {
        console.log("user founded and password correct");
        cookiesStore.set({
            name: "token",
            value: await generate_token({
                id: user.id,
                role: user.role,
                username: user.username,
            }),
            httpOnly: true,
            maxAge: 60 * 60,
        });
    } else {
        throw new Error('Password incorrect');
    }
    redirect("/main");
}

export default login