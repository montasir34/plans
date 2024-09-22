
import Header from "@/components/ui/Header";
import LoginForm from "@/components/ui/loginForm";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')?.value
  if(token){
    const decoded = await jwt.verify(`${token}`, process.env.SECRET_KEY as string);
    if(decoded){
      redirect('/main')
    }
  }
  
  return <div className="w-full h-screen bg-slate-100">
    <Header>
      <div></div>
    </Header>
    <LoginForm />
  </div>
}
