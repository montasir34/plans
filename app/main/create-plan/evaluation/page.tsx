
import EvaluateForm from '@/components/ui/evaluateForm'
import { insure_user_authenticated } from '@/lib/helper'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
  const user = await insure_user_authenticated()

  if (!user) {
    redirect('/')
  }
  if (!cookies().get('planAction')?.value) {
    redirect('/main/create-plan')
  }
  if (user.role !== 'MANAGER' && user.role !== 'SUPERVISOR') {
    redirect('/main');
  }

  const cookieStore = cookies()
  const planAction = cookieStore.get('planAction')?.value as string
  let planIdAction
  if (planAction) {
    planIdAction = JSON.parse(planAction).id    
  }
  return (
    <div>
      <h1 className='text-xl font-semibold text-[#CB8C06]'>Evaluation</h1>
      <EvaluateForm planAction={user.role === 'MANAGER' && JSON.parse(planAction)} user={user} planIdAction={planIdAction} variant='EVALUATE'  />
      {/* LINKS */}
      <div className='absolute bottom-4 left-4'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan/program' >
          Back</Link>
      </div>
      {user.role === 'MANAGER' && <div className='absolute bottom-2 right-2 flex flex-col gap-2'>
        <Link className='text-center px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='/main/create-plan/descision' >Next</Link>
      </div>}
    </div>
  )
}

export default page
