'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectScrollable from '@/components/select-component'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrEdit } from 'react-icons/gr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Program } from '@prisma/client'
import update from '@/lib/actions/plans/program/update'
import create from '@/lib/actions/plans/program/create'
import deleteProgram from '@/lib/actions/plans/program/delete'


function ProgramForm({ planId, programs }: { programs: Program[], planId: string | undefined }) {
    const { toast } = useToast()
    let createWithId: (formData: FormData) => void
    if (planId) {

        createWithId = create.bind(null, planId)
    }

    return <>
        <form action={async (e) => {
            if (createWithId) {
                try {
                    await createWithId(e)
                    toast({
                        title: 'Program Created',
                        description: 'You can create more'
                    })
                } catch (error) {
                    toast({
                        description: `Error: ${(error as Error).message}`,
                        variant: 'destructive' // Adjust the variant as needed for error messages
                    });
                }
            }
        }} className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold text-[#CB8C06]'>Add programs</h1>
            {/* FORM */}
            <div>
                <Label htmlFor='kpi'>Kpi/milestone</Label>
                <Input placeholder='Milestone' type='text' name='milestone' />
            </div>
            <div>
                <Label htmlFor='description'>Description</Label>
                <Textarea placeholder='Type description' className='w-2/5' name='description' />
            </div>

            {/* Fixed height container with scroll */}
            <ScrollArea className="h-[145px] w-[80%]   rounded-md border p-2 pr-4 mt-9">
                <h4>Milestones</h4>
                {/* {programs.map(it => ( */}

                {programs.map(it => (

                    <div key={it.id} className='mt-2 bg-[#CB8C06] text-white rounded shadow-md flex items-center text-sm justify-between p-2'>

                        <h1>{it.milestone}</h1>
                        <h1>{it.description}</h1>
                        <h1>{it.weight}%</h1>
                        <h1>{it.start_date ? new Date(it.start_date).toLocaleDateString('en-US') : 'No start date'}</h1>
                        <h1>{it.end_date ? new Date(it.end_date).toLocaleDateString('en-US') : 'No end date'}</h1>
                        <h1>{it.status}</h1>
                        <div className='flex gap-5  rounded shadow items-center justify-between text-2xl'>
                            {/* Edit and Delete */}
                            {/* Edit */}
                            <PopoverEdit {...it} />
                            {/* Delete */}
                            <Button type='button' onClick={() => {
                                try {
                                    deleteProgram(it.id)
                                    toast({
                                        title: 'Progam deleted'
                                    })
                                } catch (error) {
                                    toast({
                                        title: (error as Error).message,
                                        variant: 'destructive'
                                    })
                                }

                            }
                            } className='text-2xl bg-red-600'>
                                <RiDeleteBin6Line className='text-white hover:bg-red-700 rounded-md p-1 cursor-pointer' />
                            </Button>
                        </div>
                    </div>
                ))
                }

                {/* ))} */}
            </ScrollArea>

            {/* absolute */}
            <div className='absolute flex flex-col gap-2 top-4 right-4'>
                <SelectScrollable />
                <div className='w-full flex items-center justify-between gap-2 p-1 rounded border border-gray-300'>
                    <div>
                        <Label htmlFor=''>Start date</Label>
                        <Input type='date' name='start_date' />
                    </div>
                    <div>

                        <Label htmlFor=''>End date</Label>
                        <Input type='date' name='end_date' />
                    </div>
                </div>
                <div className='relative flex justify-between items-end'>
                    <div>
                        <Label htmlFor=''>Status</Label>
                        <Select name='status'>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NOT_DUE">Not due</SelectItem>
                                <SelectItem value="OPEN">Open</SelectItem>
                                <SelectItem value="CLOSE">Close</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {planId && <Button className='absolute -bottom-12 right-0'>Add milestone</Button>}
                </div>
            </div>
        </form>
    </>
}

export default ProgramForm




function PopoverEdit(program: Program) {
    const { toast } = useToast()
    const editProgramWithId = update.bind(null, program.id)
    return <>
        <Popover>
            <PopoverTrigger asChild>
                <Button className='text-2xl' variant="outline"><GrEdit className='text-blue-500 hover:bg-gray-100 rounded-md p-1 cursor-pointer' /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <form action={async (e) => {
                    try {
                        await editProgramWithId(e)
                        toast({
                            title: 'Program Created',
                            description: 'You can create more'
                        })
                    } catch (error) {
                        toast({
                            description: `Error: ${(error as Error).message}`,
                            variant: 'destructive' // Adjust the variant as needed for error messages
                        });
                    }
                }
                }>

                    <div className='flex flex-wrap gap-1'>
                        <div>
                            <Label htmlFor='kpi'>Kpi/milestone</Label>
                            <Input defaultValue={program.milestone} className='' type='text' name='milestone' />
                        </div>
                        <div>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea defaultValue={program.description || ''} className='' name='description' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">

                        <SelectScrollable defaultValue={`${program.weight}`} />
                        <div className='w-full flex items-center justify-between gap-2 p-1 rounded border border-gray-300'>
                            <div>
                                <Label htmlFor='startdate'>Start date</Label>
                                <Input
                                    defaultValue={program.start_date ? new Date(program.start_date).toISOString().slice(0, 10) : ''}
                                    type='date'
                                    name='start_date'
                                />
                            </div>
                            <div>
                                <Label htmlFor='enddate'>End date</Label>
                                <Input
                                    defaultValue={program.end_date ? new Date(program.end_date).toISOString().slice(0, 10) : ''}
                                    type='date'
                                    name='end_date'
                                />
                            </div>

                        </div>
                        <div className=' flex justify-between items-end'>
                            <div>
                                <Label htmlFor=''>Status</Label>
                                <Select defaultValue={program.status} name='status' >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="NOT_DUE">Not due</SelectItem>
                                        <SelectItem value="OPEN">Open</SelectItem>
                                        <SelectItem value="CLOSE">Close</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className=''>Edit milestone</Button>
                        </div>
                    </div>
                </form>
            </PopoverContent>
        </Popover >
    </>
}