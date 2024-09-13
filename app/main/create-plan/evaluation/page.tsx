
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      {/* LINKS */}
      <div className='absolute bottom-4 right-28'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan/program' >
          Back</Link>
      </div>
      <div className='absolute bottom-2 right-2 flex flex-col gap-2'>
        <Link className='px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='' >
          Submit</Link>
        <Link className='text-center px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='/main/create-plan/descision' >Next</Link>
      </div>
    </div>
  )
}

export default page
