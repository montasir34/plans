'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import Radio from '@/components/ui/radio'
function page() {
  return <>
    <div className=''>
      <h1 className='text-xl font-semibold text-[#CB8C06]'>Create plan</h1>
      <div className=' mt-4 flex flex-col gap-4'>
        <Label htmlFor='title' >Title</Label>
        <Input className='w-1/2' name='title' type='text' placeholder='Title' />
        <Label htmlFor='description'>Description</Label>
        <Textarea name='description' placeholder='Type description here' className='w-1/2' />
        <Label htmlFor=''>Plant modification</Label>
        <Radio />
      </div>

      <div className='absolute bottom-4 right-4'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan/program' >
          Next</Link>
      </div>
      <div className='absolute bottom-4 right-24'>
        <Link className='px-5 py-2 text-[#f12e2e] border border-[#d31010] rounded hover:text-[#a82424]' href='/main/' >
          Cancel</Link>
      </div>
      <Label htmlFor='image' className='absolute border-2 border-dashed h-52 w-52 top-4 right-4
        flex items-center justify-center cursor-pointer hover:bg-gray-100
      '>
        <RiImageAddLine className='text-4xl text-gray-300' />
        <Input className='hidden' id='image' type='file' />
      </Label>
    </div>
  </>
}

export default page
