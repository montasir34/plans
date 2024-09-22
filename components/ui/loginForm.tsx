'use client'
import React, { useState } from 'react'
import login from "@/lib/actions/auth/login";
import register from "@/lib/actions/auth/register";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type variant = "LOGIN" | "REGISTER"

function LoginForm() {
    const { toast } = useToast()
    const [variant, setVariant] = useState<variant>('LOGIN')
    const action = variant === 'LOGIN' ? login : register
    const [show, setShow] = useState(false)
    return <>
        <form autoComplete='of' action={async (e: FormData) => {
            try {
                await action(e)

            } catch (error) {
                toast({
                    description: `Error: ${(error as Error).message}`,
                    variant: 'destructive' // Adjust the variant as needed for error messages
                });
            }
        }
        } className="bg-white shadow-md flex flex-col gap-2 m-auto w-52 relative top-1/4    rounded-md p-2">
            <h1 className="font-bold text-xl mb-2 mt-1">{variant === 'LOGIN' ? 'Login' : 'Register'}</h1>
            <input className="outline-none h-8 pl-2 border-b-2 border-yellow-300" autoComplete={`${variant === 'REGISTER' ? 'off' : undefined}`} name="username" type="text" placeholder="Username" />
            {variant === 'REGISTER' && (
                <input className="outline-none h-8 pl-2 border-b-2 border-yellow-300" name="email" type="email" placeholder="Email" />
            )}
            <div className='relative'>
                <input className="outline-none w-full h-8 pl-2 border-b-2 border-yellow-300" autoComplete={`${variant === 'REGISTER' ? 'off' : undefined}`} name='password' type={`${show ? 'text' : 'password'}`} placeholder="password" />
                <div onClick={() => setShow(!show)} className='absolute right-2 cursor-pointer top-1/4 text-xl'>
                    {show ? <FaRegEye /> :
                        <FaRegEyeSlash />}
                </div>
            </div>
            <Button className="bg-[#CB8C06] hover:bg-[#8c6205]">sign in</Button>
            <p onClick={() => setVariant(p => p === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                className="text-xs mt-3 text-blue-600 underline underline-offset-2 hover:text-blue-800 cursor-pointer">
                {variant === 'LOGIN' ? 'you dont have an account ?' : 'Already have an account ?'}
            </p>
        </form>
    </>
}
export default LoginForm
