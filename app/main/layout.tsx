'use client'
import { IoIosNotifications, IoMdAdd } from "react-icons/io";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Header from "@/components/ui/Header";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const createplanPath = pathname !== '/main/create-plan'
    return <div className="h-screen w-full">
        <Header>
            <div className="flex gap-4 items-center">
                {createplanPath && <Link href='/main/create-plan' className="px-3 py-1 mr-3 flex items-center gap-1 border-2 border-[#CB8C06] text-[#CB8C06] ">
                    Add plan
                    <IoMdAdd className="text-xl" />
                </Link>}
                <div className="relative">
                    <span className="rounded-full absolute ring-1 ring-white
                    justify-center px-[3px] border border-black text-[7px] right-1 top-1 flex items-center
                     bg-white">2</span>
                    <IoIosNotifications className="text-3xl text-[#CB8C06] cursor-pointer   " />
                </div>
                <Avatar className="border border-[#CB8C06] cursor-pointer">
                    <AvatarImage src="/image/Avatar.png" />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
            </div>

        </Header>
        {children}
    </div>
}
