'use client'
import { IoMdAdd } from "react-icons/io";

import Header from "@/components/ui/Header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar_logout from "@/components/ui/avatar_logout";
import Notifypopup from "@/components/ui/notifi-popup";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()
    const mainPath = pathname === '/main'
    return <div className="h-screen w-full">
        <Header>
            <div className=" relative flex gap-7 items-center">
                {mainPath && <Link href='/main/create-plan' className="px-3 py-1 mr-3 flex items-center gap-1 border-2 border-[#CB8C06] text-[#CB8C06] ">
                    Add plan
                    <IoMdAdd className="text-xl" />
                </Link>}
                <Notifypopup />
                <Avatar_logout />
            </div>

        </Header>
        {children}
    </div>
}
