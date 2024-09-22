'use client'
import deleteCookie from '@/lib/actions/auth/deleteCookies'
import { insure_user_authenticated } from '@/lib/helper'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'


 function Page() {
  useEffect(() => {
    async function effect() {
      const user = await insure_user_authenticated()
      if (!user) {
        redirect('/')
      }
      
      deleteCookie()

    }
    effect()
  }, [])



  return (
    <div className='w-32 p-1 border border-[#CB8C06] rounded-md text-center m-auto mt-44' >
      HOME
    </div>
  )
}

export default Page
