// 'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrEdit } from 'react-icons/gr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from './input'
import { Label } from './label'
import { Button } from './button'
import SelectScrollable from '../select-component'
import { Textarea } from './textarea'
import {prisma} from '@/lib/db'

async function ProgramTable({ planId }: { planId: string }) {
    const programs = await prisma.program.findMany({
        where: {
            planId
        },
    })
    return <ScrollArea className="h-[145px] w-[80%]   rounded-md border p-2 pr-4 mt-9">
        <h4>Milestones</h4>
        {programs.map(it => (

            <div key={it.id} className='mt-2 bg-[#CB8C06] text-white rounded shadow-md flex items-center text-sm justify-between p-2'>

                <h1>{it.milestone}</h1>
                <h1>{it.description}</h1>
                <h1>{it.start_date ? new Date(it.start_date).toLocaleDateString() : 'No start date'}</h1>
                <h1>{it.end_date ? new Date(it.end_date).toLocaleDateString() : 'No end date'}</h1>
                <h1>{it.status}</h1>

                <div className='flex gap-5 bg-white rounded shadow items-center justify-between text-2xl'>
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

        ))}
    </ScrollArea>
}

export default ProgramTable
