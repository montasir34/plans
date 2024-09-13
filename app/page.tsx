'use client'
import Button from "@/components/ui/button";
import Header from "@/components/ui/Header";
import { useState } from "react";

type variant = "LOGIN" | "REGISTER"
export default function Home() {
  const [variant, setVariant] = useState<variant>('LOGIN')
  return <div className="w-full h-screen bg-slate-100">
    <Header>
      <div></div>
    </Header>
    <form className="bg-white shadow-md flex flex-col gap-2 m-auto w-52 relative top-1/4    rounded-md p-2">
      <h1 className="font-bold text-xl mb-2 mt-1">{variant === 'LOGIN' ? 'Login' : 'Register'}</h1>
      <input className="outline-none h-8 pl-2 border-b-2 border-yellow-300" name="username" type="text" placeholder="Username" />
      {variant === 'REGISTER' && (
        <input className="outline-none h-8 pl-2 border-b-2 border-yellow-300" name="email" type="email" placeholder="Email" />
      )}
      <input className="outline-none h-8 pl-2 border-b-2 border-yellow-300" name="password" type="password" placeholder="password" />
      <Button title="sign in" />
      <p onClick={() => setVariant(p => p === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
        className="text-xs mt-3 text-blue-600 underline underline-offset-2 hover:text-blue-800 cursor-pointer">
        {variant === 'LOGIN' ? 'you dont have an account ?' : 'Already have an account ?'}
      </p>
    </form>
  </div>
}
