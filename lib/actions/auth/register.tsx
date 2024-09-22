'use server'
import {prisma} from '@/lib/db'
import { generate_token, hash_password } from '@/lib/helper'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function register(formData: FormData) {
    const cookie = cookies()
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const email = formData.get('email') as string
    //validate data
    if (!username || !password || !email) {
        throw new Error('Please enter all fields')
    }
    // ensure user email not exist in databaase
    const userExist = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (userExist) {
        throw new Error('User already exist try another email')
    }
    //create userid
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: await hash_password(password),
            role: 'EMPLOYER'
        }
    })
    // Set cookie
    cookie.set({
        name: 'token',
        value: await generate_token({
            id: user.id,
            role: user.role,
            username: user.username
        }),
        httpOnly: true,
        maxAge: 60 * 60
    })
    //redirect to /main
    redirect('/main')
}

export default register
