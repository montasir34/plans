'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

interface buttonProps {
    title: string
    disabled?: boolean
}

const Button: React.FC<buttonProps> = ({ title, disabled }) => {
    const { pending } = useFormStatus()
    return <>
        <button className='py-1 px-3 mt-2 bg-[#CB8C06] hover:bg-[#9e6e07] text-white rounded-sm' disabled={disabled || pending}>{pending ? 'signing...' : title}</button>
    </>
}

export default Button