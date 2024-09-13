'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function createPlanLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const programpath = pathname === '/main/create-plan/program'
    const createpath = pathname === '/main/create-plan'
    return <>
        <div className="flex items-center h-screen flex-col mt-11">
            <div className={` flex -z-20 p-2 items-center w-[140px]`}>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06] text-white
                font-bold">1</div>
                <AnimatePresence>
                    {programpath && (
                        <motion.div

                            initial={{ x: -40 }}
                            animate={{ x: 0.1 }}
                            exit={{ x: -40 }}
                            transition={{ duration: 1 }}
                            className="w-11  border-b-2 h-0 -z-10 border-[#CB8C06]">
                        </motion.div>
                    )
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {programpath && <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white
                font-bold h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06]">
                        2</motion.div>}
                </AnimatePresence>
            </div>
            <div className='relative p-4 w-[50%] h-[66%] rounded-md border-2 border-[#CB8C06]'>
                {children}
            </div>
        </div>
    </>
}