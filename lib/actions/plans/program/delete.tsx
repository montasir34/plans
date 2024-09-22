'use server'
import { prisma } from "@/lib/db"
import { insure_user_authenticated } from "@/lib/helper"
import { revalidatePath } from "next/cache"

async function deleteProgram(id: string) {
    console.log('ougvb')
    await insure_user_authenticated()
    try {
        await prisma.program.delete({
            where: {
                id
            }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
    revalidatePath('/main/create-plan/program')
}

export default deleteProgram