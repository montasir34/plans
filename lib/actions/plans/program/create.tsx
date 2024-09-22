'use server'

import { prisma } from '@/lib/db'
import { insure_user_authenticated } from '@/lib/helper'
import { Program_status } from '@prisma/client'
import { revalidatePath } from 'next/cache'

async function create(planId: string, formData: FormData) {
    const milestone = formData.get('milestone') as string | null
    const description = formData.get('description') as string | null
    const weight = formData.get('weight') as number | null
    const start_date = formData.get('start_date') as string | null
    const end_date = formData.get('end_date') as string | null
    const status = formData.get('status') as Program_status | null

    function convertToIso(date: string) {
        const event = new Date(date)
        return event.toISOString()
    }
    if (!milestone || !weight || !start_date || !end_date || !status) {
        throw new Error('Some fields required')
    }
    try {
        insure_user_authenticated()
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }

    try {

        await prisma.plan.update({
            where: {
                id: planId
            },
            data: {
                programs: {
                    create: {
                        milestone,
                        description,
                        weight: Number(weight),
                        start_date: convertToIso(start_date),
                        end_date: convertToIso(end_date),
                        status,
                    }
                }
            }
        })
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
    revalidatePath('/main/create-plan/program')
}

export default create

