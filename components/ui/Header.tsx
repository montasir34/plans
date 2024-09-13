import Image from 'next/image'
import React from 'react'
import Logo from '../../public/image/Logo.svg'
import { usePathname } from 'next/navigation'
export default function Header({ children }: { children: React.ReactNode }) {
    
    return (
        <div className='w-full px-10 py-3 bg-white shadow-sm flex items-center justify-between'>
            {/* Logo */}
            <Logo />
            {children}
        </div>
    )
}
