
'use client'
import React from 'react'
import { Button } from './button'
import deleteProgram from '@/lib/actions/plans/program/delete'
import { RiDeleteBin6Line } from 'react-icons/ri'

function DeleteButton({ id }: { id: string }) {
    return <>
        <Button type='button' onClick={() => deleteProgram(id)} className='text-2xl bg-red-600'>
            <RiDeleteBin6Line className='text-white hover:bg-red-700 rounded-md p-1 cursor-pointer' />
        </Button>
    </>
}

export default DeleteButton
