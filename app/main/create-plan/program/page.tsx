

import Link from 'next/link'
import React from 'react'

function Program() {
  return (
    <div>
      program
      <div className='absolute bottom-4 right-32'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan' >
          Back</Link>
      </div>
      <div className='absolute bottom-4 right-4'>
        <Link className='px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='' >
          Submit</Link>
      </div>
    </div>
  )
}

export default Program
