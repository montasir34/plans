

import SelectScrollable from '@/components/select-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrEdit } from 'react-icons/gr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function Program() {
  return (
    <div className='flex flex-col gap-2'>
      {/* FORM */}
      <h1 className='mb-3'>Add programs</h1>
      <div>
        <Label htmlFor='kpi'>Kpi/milestone</Label>
        <Input placeholder='Milestone' type='text' name='kpi' />
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea placeholder='Type description' className='w-2/5' name='description' />
      </div>

      {/* Fixed height container with scroll */}
      <ScrollArea className="h-[145px] w-[80%]   rounded-md border p-2 pr-4 mt-3">
        <h4>Milestones</h4>

        <div className='mt-2 bg-slate-200 rounded shadow-md flex items-center text-sm justify-between p-2'>
          <h1>withdraw money</h1>
          <h1>30%</h1>
          <h1>2/4/2045</h1>
          <h1>2/5/2045</h1>
          <h1>open</h1>
          <div className='flex gap-5 items-center justify-between text-2xl'>
            {/* Edit and Delete */}
            {/* Edit */}
            <Popover>
              <PopoverTrigger asChild>
                <GrEdit className='text-blue-500 hover:bg-gray-100 rounded-md p-1 cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent className='w-full'>
                <div className='flex flex-wrap gap-1'>
                  <div>
                    <Label htmlFor='kpi'>Kpi/milestone</Label>
                    <Input className='' type='text' name='kpi' />
                  </div>
                  <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea className='' name='description' />
                  </div>
                </div>
                <div className="flex flex-col gap-1">

                  <SelectScrollable />
                  <div className='w-full flex items-center justify-between gap-2 p-1 rounded border border-gray-300'>
                    <div>
                      <Label htmlFor=''>Start date</Label>
                      <Input type='date' name='startdate' />
                    </div>
                    <div>
                      <Label htmlFor=''>End date</Label>
                      <Input type='date' name='enddate' />
                    </div>
                  </div>
                  <div className=' flex justify-between items-end'>
                    <div>
                      <Label htmlFor=''>Status</Label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Not due</SelectItem>
                          <SelectItem value="dark">Open</SelectItem>
                          <SelectItem value="system">Close</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className=''>Edit milestone</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {/* Delete */}
            <RiDeleteBin6Line className='text-red-600 hover:bg-gray-100 rounded-md p-1 cursor-pointer' />
          </div>
        </div>

      </ScrollArea>

      {/* absolute */}
      <div className='absolute flex flex-col gap-2 top-4 right-4'>
        <SelectScrollable />
        <div className='w-full flex items-center justify-between gap-2 p-1 rounded border border-gray-300'>
          <div>
            <Label htmlFor=''>Start date</Label>
            <Input type='date' name='startdate' />
          </div>
          <div>
            <Label htmlFor=''>End date</Label>
            <Input type='date' name='enddate' />
          </div>
        </div>
        <div className='relative flex justify-between items-end'>
          <div>
            <Label htmlFor=''>Status</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Not due</SelectItem>
                <SelectItem value="dark">Open</SelectItem>
                <SelectItem value="system">Close</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className='absolute -bottom-12 right-0'>Add milestone</Button>
        </div>
      </div>
      {/* LINKS */}
      <div className='absolute bottom-4 right-28'>
        <Link className='px-5 py-2 text-white bg-[#CB8C06] rounded hover:bg-[#976a08]' href='/main/create-plan' >
          Back</Link>
      </div>
      <div className='absolute bottom-2 right-2 flex flex-col gap-2'>
        <Link className='px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='' >
          Submit</Link>
        <Link className='text-center px-5 py-2 text-white bg-[#0ac413] rounded hover:bg-[#077d07]' href='/main/create-plan/evaluation' >Next</Link>
      </div>
    </div>
  )
}

export default Program
