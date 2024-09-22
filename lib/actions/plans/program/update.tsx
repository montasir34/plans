'use server'

import {prisma} from "@/lib/db"
import { insure_user_authenticated } from "@/lib/helper"
import { Program_status } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function update(programId: string, formData: FormData) {
    const milestone = formData.get('milestone') as string | null
    const description = formData.get('description') as string | null
    const weight = formData.get('weight') as number | null
    const start_date = formData.get('start_date') as string | null
    const end_date = formData.get('end_date') as string | null
    const status = formData.get('status') as Program_status | null

    console.log({ milestone, description, weight, start_date, end_date, status, programId })
    if (!milestone || !status || !start_date || !end_date || !weight) {
        throw new Error('There is fields required')
    }
    await insure_user_authenticated()
    function convertToIso(date: string) {
        const event = new Date(date)
        return event.toISOString()
    }
    try {
        await prisma.program.update({
            where: {
                id: programId
            },
            data: {
                milestone,
                description,
                weight: Number(weight),
                start_date: convertToIso(start_date),
                end_date: convertToIso(end_date),
                status
            }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
    revalidatePath('/main/create-plan/program')
}

export default update
