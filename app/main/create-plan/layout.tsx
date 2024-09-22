'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function CreatePlanLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const programpath = pathname === '/main/create-plan/program'
    const evaluationpath = pathname === '/main/create-plan/evaluation'
    const descisionpath = pathname === '/main/create-plan/descision'
    return <>
        <div className="flex items-center h-screen flex-col mt-11 ">
            <div className={` relative flex gap-8 -z-20 p-2 items-center   w-[80%]`}>
                <div className="flex flex-col items-center justify-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06] text-white
                font-bold">1</div>
                    <h1 className="text-xs text-[#CB8C06] font-semibold">Create plan</h1>
                </div>
                <AnimatePresence>
                    {(programpath || evaluationpath || descisionpath ) && (
                        <motion.div

                            initial={{ width: 0 }}
                            animate={{ width: programpath ? '100px' : evaluationpath ? '200px' :  '320px'}}
                            exit={{ width: 0 }}
                            transition={{ duration: 1 }}
                            className={` absolute left-8 top-[38%]  border-b-2 h-0 -z-10 border-[#CB8C06]`}>
                        </motion.div>
                    )
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {(programpath || evaluationpath || descisionpath ) && <div className="flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{delay: 1}}
                            className="text-white
                            font-bold h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06]">
                            2</motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1 }}
                            className="text-xs text-[#CB8C06] font-semibold">Add programs</motion.h1>                    </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {(evaluationpath || descisionpath ) && <div className="flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{delay:1}}
                            className="text-white
                font-bold h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06]">
                            3</motion.div>
                            <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1 }}
                            className="text-xs text-[#CB8C06] font-semibold">Evaluation</motion.h1>
                    </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {( descisionpath) && <div className="flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{delay:1}}
                            className="text-white
                font-bold h-10 w-10 flex items-center justify-center rounded-full bg-[#CB8C06]">
                            4</motion.div>
                            <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1 }}
                            className="text-xs text-[#CB8C06] font-semibold">Descision</motion.h1>
                    </div>
                    }
                </AnimatePresence>
                
            </div>
            <div className='relative p-4  w-[80%] h-[66%] rounded-md border-2 border-[#CB8C06]'>
                {children}
            </div>
        </div>
    </>
}