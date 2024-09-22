

import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import ProgramForm from '@/components/ui/programForm'
import { insure_user_authenticated } from '@/lib/helper'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Plan, Program as programType } from '@prisma/client'

async function Program() {
  const user = await insure_user_authenticated()

  const cookieStore = cookies();
  const planCookieValue = cookieStore.get('plan')?.value as string
  const evaluatePlan = cookieStore.get('planAction')?.value
  if (!planCookieValue && !evaluatePlan) {
    redirect('/main/create-plan');  // Redirect if no plan cookie
  }

  let planCookie: Plan | null = null;
  if (planCookieValue) {
    planCookie = JSON.parse(planCookieValue) as Plan; // Try parsing the plan cookie
  }
  let planId

  if (planCookie) {
    planId = planCookie.id
    // You can now use planId safely
  }
  let programs: programType[] = [];

  let evaluate
  if(evaluatePlan){
    evaluate = JSON.parse(evaluatePlan)
  }

  try {
    // // Parse cookie value
    // if (typeof planId !== 'string') {
    //   throw new Error('Plan ID should be a string');
    // }

    programs = await prisma.program.findMany({
      where: {
        planId : planId || evaluate.id
      }
    });
  } catch (error) {
    throw new Error(`Failed to fetch programs: ${(error as Error).message}`);
  }

  return <>
    <ProgramForm planId={planId} programs={programs} />
    {/* LINKS */}
    <div className='absolute bottom-4 left-4'>
      <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan' >
        Back</Link>
    </div>
    <div className='absolute bottom-2 right-2 flex flex-col gap-2'>

      <Link className='text-center px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]'
        href={`${user.role === 'MANAGER' ? '/main/create-plan/evaluation' : user.role === 'SUPERVISOR' ? '/main/create-plan/evaluation' : '/main'}`} >
        {user.role === 'EMPLOYER' ? 'Done' : 'Next'}
      </Link>
    </div>
  </>
}

export default Program
