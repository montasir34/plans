'use client'

import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import create from '@/lib/actions/plans/evaluate/create'
import update from '@/lib/actions/plans/update'
import { useToast } from '@/hooks/use-toast'
import { Label } from './label'
import { Descision, Review } from '@prisma/client'
import { userInfoType } from '@/lib/helper'
import { AverageScores } from '@/app/main/create-plan/descision/page'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

type Variant = 'EVALUATE' | 'DESCISION'
type PlanDescision = 'APPROVED' | 'POSTPONED' | 'VALIDATION' | 'REJECTED'
interface PlanAction {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    file: string | null;
    descision: Descision | null;
    userId: string | null;
    createdAt: Date | string; // Accept both Date and string types
    reviews: Review[];
}
function EvaluateForm({ user, planIdAction, variant, planAction, average }: { average?: AverageScores | null, user: userInfoType, variant: Variant, planAction?: PlanAction, planIdAction?: string }) {
    const { toast } = useToast()
    const [selectedValue, setSelectedValue] = useState<PlanDescision>('APPROVED')
    let firstReview
    if (user.role === 'MANAGER') {
        firstReview = planAction?.reviews[0]
    }
    const [review, setReview] = useState<Review | undefined>(firstReview)
    const [count, setCount] = useState(0)
    console.log(count)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value as PlanDescision)
    }
    const [justification, setJustification] = useState(false)
    const Length = planAction?.reviews?.length ? planAction.reviews.length - 1 : 0;
    function forward() {

        if (count === Length) {
            return
        }
        setCount(prev => prev + 1)

        setReview(planAction?.reviews[count])
    }

    function backward() {
        if (count === 0) {
            return
        }
        setCount(prev => prev - 1)
        setReview(planAction?.reviews[count])
    }

    let createWithId: ((formData: FormData) => Promise<void>) | undefined;
    if (planIdAction && variant === 'DESCISION') {
        // const planId = JSON.parse(planCookie).id;
        // For `create`, bind `planId` and `userId`
        createWithId = update.bind(null, planIdAction);
    }
    if (planIdAction && variant === 'EVALUATE') {

        createWithId = create.bind(null, planIdAction)
    }


    return <>
        <form className='flex flex-col gap-2 mt-4 relative h-[470px]' action={async (e) => {
            if (createWithId) {
                try {
                    await createWithId(e)
                    toast({
                        title: `${variant === 'DESCISION' ? 'Your descision has been submited' : 'Your evaluation has been submited'}`,
                        description: 'We will notify the plan creator'
                    })

                } catch (error) {
                    toast({
                        description: `Error: ${(error as Error).message}`,
                        variant: 'destructive' // Adjust the variant as needed for error messages
                    });
                }
            } else {
                toast({
                    title: 'No plan id'
                })
            }
        }}>

            {variant === 'EVALUATE' && user.role === 'MANAGER' && <>
                <DescisionInput defaultValue={review?.financial_impact} title='Financial Impact' name='financial_impact' variant={variant} />
                <DescisionInput defaultValue={review?.environment_impact} title='Environment Impact' name='environment_impact' variant={variant} />
                <DescisionInput defaultValue={review?.business_impact} title='Business Impact' name='business_impact' variant={variant} />
                <DescisionInput defaultValue={review?.workforce_or_society} title='Workforce or Society' name='workforce_or_society' variant={variant} />
                <DescisionInput defaultValue={review?.resource_management} title='Resource Management' name='resource_management' variant={variant} />
                <DescisionInput defaultValue={review?.innovation_and_planning} title='Innovation and Planning' name='innovation_and_planning' variant={variant} />
            </>
            }
            {variant === 'EVALUATE' && user.role === 'SUPERVISOR' && <>
                <DescisionInput defaultValue={review?.financial_impact} title='Financial Impact' name='financial_impact' variant={variant} />
                <DescisionInput defaultValue={review?.environment_impact} title='Environment Impact' name='environment_impact' variant={variant} />
                <DescisionInput defaultValue={review?.business_impact} title='Business Impact' name='business_impact' variant={variant} />
                <DescisionInput defaultValue={review?.workforce_or_society} title='Workforce or Society' name='workforce_or_society' variant={variant} />
                <DescisionInput defaultValue={review?.resource_management} title='Resource Management' name='resource_management' variant={variant} />
                <DescisionInput defaultValue={review?.innovation_and_planning} title='Innovation and Planning' name='innovation_and_planning' variant={variant} />
            </>
            }

            {variant === 'DESCISION' && <>
                <DescisionInput average={average?.financial_impact} title='Financial Impact' name='financial_impact' variant={variant} />
                <DescisionInput average={average?.environment_impact} title='Environment Impact' name='environment_impact' variant={variant} />
                <DescisionInput average={average?.business_impact} title='Business Impact' name='business_impact' variant={variant} />
                <DescisionInput average={average?.workforce_or_society} title='Workforce or Society' name='workforce_or_society' variant={variant} />
                <DescisionInput average={average?.resource_management} title='Resource Management' name='resource_management' variant={variant} />
                <DescisionInput average={average?.innovation_and_planning} title='Innovation and Planning' name='innovation_and_planning' variant={variant} />
            </>}




            {/* absolu */}
            {variant === 'EVALUATE' && user.role === 'MANAGER' && <>
                <div className='absolute text-5xl text-[#CB8C06] w-1/4 right-0 -top-28 flex items-center justify-between'>
                    <IoIosArrowDropleft className={`${count === Length ? 'text-gray-300' : 'cursor-pointer'}`} onClick={() => forward()} />
                    <h1 className='text-xl'>{review?.reviewer_username}</h1>
                    <IoIosArrowDropright className={`${count === 0 ? 'text-gray-300' : 'cursor-pointer'}`} onClick={() => backward()} />
                </div>
            </>}
            {variant === 'EVALUATE' && <div className="absolute  top-0 right-0 w-1/3 text-lg  flex flex-col gap-3">
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        name="status"
                        onChange={() => setJustification(false)}
                        value="ACCEPTED"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />
                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Accepted
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        name="status"
                        onChange={() => setJustification(false)}
                        value="NEED_ENHANCEMENT"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />
                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Need enhancement
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        onChange={() => setJustification(true)}
                        name="status"
                        value="REJECTED"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />

                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Rejected
                    </label>
                </div>

                {justification && <Textarea className='w-[80%]' name='justification' placeholder='Type justification here' />}
            </div>}
            {variant === 'EVALUATE' && !!review && <div className="absolute  top-0 right-0 w-1/3 text-lg  flex flex-col gap-3">
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        name="status"
                        disabled={!!review}
                        checked={user.role === 'MANAGER' && review?.status === 'ACCEPTED'}
                        onChange={() => setJustification(false)}
                        value="ACCEPTED"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />
                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Accepted
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        name="status"
                        disabled={!!review}
                        checked={user.role === 'MANAGER' && review?.status === 'NEED_ENHANCEMENT'}
                        onChange={() => setJustification(false)}
                        value="NEED_ENHANCEMENT"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />
                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Need enhancement
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="required"
                        type="radio"
                        disabled={!!review}
                        onChange={() => setJustification(true)}
                        name="status"
                        checked={review?.status === 'REJECTED'}
                        value="REJECTED"
                        className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                    />

                    <label
                        htmlFor="required"
                        className="ml-2  font-medium text-gray-900"
                    >
                        Rejected
                    </label>
                </div>

                {justification && <Textarea className='w-[80%]' name='justification' placeholder='Type justification here' />}
            </div>}
            {variant === 'DESCISION' && <>
                <div className='absolute top-60 right-5'>
                    <h1 className='text-[#CB8C06] font-semibold'> Descision</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="radio"
                                name="decision"
                                value="APPROVED"
                                checked={selectedValue === 'APPROVED'}
                                onChange={handleChange}
                            />

                            <Label className='text-gray-500 font-bold' htmlFor='' >Approved</Label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="radio"
                                name="decision"
                                value="POSTPONED"
                                checked={selectedValue === 'POSTPONED'}
                                onChange={handleChange}
                            />                            <Label className='text-gray-500 font-bold' htmlFor='' >Postponed</Label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="radio"
                                name="decision"
                                value="VALIDATION_REQUIRED"
                                checked={selectedValue === 'VALIDATION'}
                                onChange={handleChange}
                            />                            <Label className='text-gray-500 font-bold' htmlFor='' >Validation required</Label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="radio"
                                name="decision"
                                value="REJECTED"
                                checked={selectedValue === 'REJECTED'}
                                onChange={handleChange}
                            />
                            <Label className='text-gray-500 font-bold' htmlFor='' >Rejected</Label>
                        </div>
                    </div>
                </div>
            </>}
            {(user.role === 'MANAGER' || user.role === 'SUPERVISOR') && <Button disabled={review && variant === 'EVALUATE'} className={`px-5 py-2 absolute bottom-1 right-24 text-white bg-[#0ac413] rounded hover:bg-[#077d07]`}  >
                Submit</Button>
            }
        </form>
    </>
}

export default EvaluateForm


export function DescisionInput({ variant, name, title, defaultValue, average }: { average?: string, variant: Variant, name: string, title: string, defaultValue?: number | null }) {
    const ref = useRef<HTMLInputElement>(null)
    function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (Number(e.target.value) > 10) {
            e.target.value = '10'
        }
    }
    const increase = () => {
        let input = Number(ref.current?.value);

        // Increase by 20% and ensure precision
        if (input === 10) {
            return
        }
        input = parseFloat((input + 0.2).toFixed(1));

        // Assign the new value back
        ref.current!.value = input.toString();
    }
    const decrease = () => {
        let input = Number(ref.current?.value);

        // Increase by 20% and ensure precision
        if (input < 0.2) {
            return
        }
        input = parseFloat((input - 0.2).toFixed(1));

        // Assign the new value back
        ref.current!.value = input.toString();
    }
    return <>
        <div className={`flex justify-between ${variant === 'EVALUATE' ? 'w-1/3' : 'w-1/2'}`}>
            <h3>{title}</h3>
            {variant === 'EVALUATE' && <Input ref={ref} disabled={!!defaultValue}
                name={name} defaultValue={defaultValue || undefined}
                className='w-20' onChange={handleNumberChange} type='' placeholder='1 - 10' />}
            {variant === 'DESCISION' && <Input ref={ref} disabled={!!defaultValue}
                name={name} defaultValue={average}
                className='w-20' onChange={handleNumberChange} type='' placeholder='1 - 10' />}
            {variant === 'DESCISION' && <div className='flex gap-2'>
                <Button type='button' onClick={decrease} className='bg-red-600 text-white'>-20%</Button>
                <Button type='button' onClick={increase} className='bg-green-600 text-white'>+20%</Button>
            </div>}
        </div>
    </>
}