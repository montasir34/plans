'use server'

import { prisma } from "@/lib/db"
import { insure_user_authenticated, uploadFile } from "@/lib/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function Create_plan(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string || null
    const file = formData.get('file') as File || null
    const image = formData.get('image') as File || null
    const { id } = await insure_user_authenticated()
    const cookieStore = cookies()
    if (!title) {
        throw new Error('Title required')
    }
    try {
        const plan = await prisma.plan.create({
            data: {
                title,
                description,
                file: await uploadFile(file),
                image: await uploadFile(image),
                userId: id,
            }
        })
        await prisma.notification.create({
            data: {
                planId: plan.id,
                content: 'New plan need to review and evaluate',
                notification_type: 'NEW_PLAN'
            }
        })
        cookieStore.set({
            name: 'plan',
            value: JSON.stringify(plan),
            httpOnly: true,
            maxAge: 60 * 60
        })
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
    redirect('/main/create-plan/program')
}

export default Create_plan
