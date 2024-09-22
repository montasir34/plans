'use server'

import { prisma } from "@/lib/db";
import { insure_user_authenticated } from "@/lib/helper";
import { Descision } from "@prisma/client";
import { redirect } from "next/navigation";

async function update(planId: string, formData: FormData) {
    // const environment_impact = parseFloat(formData.get('environment_impact') as string) || null;
    // const business_impact = parseFloat(formData.get('business_impact') as string) || null;
    // const financial_impact = parseFloat(formData.get('financial_impact') as string) || null;
    // const resource_management = parseFloat(formData.get('resource_management') as string) || null;
    // const workforce_or_society = parseFloat(formData.get('workforce_or_society') as string) || null;
    // const innovation_and_planning = parseFloat(formData.get('innovation_and_planning') as string) || null;
    const descision = formData.get('decision') as Descision

    console.log({ descision, planId })
    // console.log(environment_impact, business_impact, financial_impact, workforce_or_society, innovation_and_planning, resource_management, descision, planId);

    if (!descision) {
        throw new Error('Please make a decision')
    }
    await insure_user_authenticated()
    try {
        const updated_plan = await prisma.plan.update({
            where: {
                id: planId
            },
            data: {
                descision,

            }
        })

        await prisma.user.update({
            where: {
                id: updated_plan.userId || undefined
            },
            data: {
                notification: {
                    create: {
                        planId,
                        notification_type: 'DESCISION',
                        content: 'The manager gave you descision to your plan'
                    }
                }
            }
        })

    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
    redirect('/main')
}

export default update;
