'use server'

import { prisma } from '@/lib/db'
import { insure_user_authenticated } from '@/lib/helper'
import { Status } from '@prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function create(planId: string, formData: FormData) {
    const environment_impact = Number(formData.get('environment_impact')) as number | null
    const business_impact = Number(formData.get('business_impact')) as number | null
    const financial_impact = Number(formData.get('financial_impact')) as number | null
    const workforce_or_society = Number(formData.get('workforce_or_society')) as number | null
    const innovation_and_planning = Number(formData.get('innovation_and_planning')) as number | null
    const resource_management = Number(formData.get('resource_management')) as number | null
    const status = formData.get('status') as Status
    const justification = formData.get('justification') as string | null


    if (!status) {
        throw new Error('You should take action')
    }
    const { id, username } = await insure_user_authenticated()
    const superVisorAlreadySubmit = await prisma.review.findFirst({
        where: {
            reviewer_id: id,
            planId
        }
    })
    if (superVisorAlreadySubmit) {
        throw new Error('You done it before')
    }
    try {
        await prisma.plan.update({
            where: {
                id: planId
            },
            data: {
                reviews: {
                    create: {
                        business_impact,
                        environment_impact,
                        financial_impact,
                        workforce_or_society,
                        innovation_and_planning,
                        resource_management,
                        status,
                        justification,
                        reviewer_id: id,
                        reviewer_username: username
                    }
                }
            }
        })
        cookies().delete('plan')
        await prisma.notification.create({
            data: {
                planId,
                content: `${username} evaluate done`,
                notification_type: 'EVALUATE',
            }
        })
    } catch (error) {
        throw new Error(`Error: ${(error as Error).message}`)
    }
    redirect('/main')
}

export default create
