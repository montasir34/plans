'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from './avatar'
import { IoIosArrowDown } from 'react-icons/io'
import { logout } from '../../lib/actions/auth/logout'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { insure_user_authenticated, userInfoType } from '@/lib/helper'

function Avatar_logout() {

    const [popup, setPopup] = useState(false)
    const [user, setUser] = useState<userInfoType>()
    useEffect(() => {
        (async () => {
            const data = await insure_user_authenticated()
            if (data) {
                setUser(() => data)
            }
        })()
    }, [])
    return <div className="flex gap-3 items-center">
        <h1>{user?.username}</h1>
        <Avatar onClick={() => setPopup(!popup)} className="border border-[#c2b497] cursor-pointer">
            <AvatarImage src="/image/Avatar.png" />
            {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        <IoIosArrowDown onClick={() => setPopup(!popup)} className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer" />
        {popup && <div className="absolute top-full rounded w-32 right-8 bg-white text-sm shadow-lg">
            <div onClick={() => logout()} className='w-full flex gap-1 items-center p-1 justify-center text-red-500 hover:bg-gray-100'>
                <RiLogoutBoxLine />
                Log out
            </div>
        </div>}
    </div>
}

export default Avatar_logout
