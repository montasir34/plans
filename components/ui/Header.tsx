import React from 'react'
import Logo from '../../public/image/Logo.svg'
export default function Header({ children }: { children: React.ReactNode }) {
    
    return (
        <div className='relative w-full px-10 py-3 bg-white shadow-sm flex items-center justify-between'>
            {/* Logo */}
            <Logo />
            {children}
        </div>
    )
}
