'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import Radio from '@/components/ui/radio'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Create_plan from '@/lib/actions/plans/create'
import { useToast } from "@/hooks/use-toast"
import { PlanAction } from '@/app/main/create-plan/page'

interface FormInputs {
    title: string | null;
    description: string | null;
    file: File | null;
}
function CreatePlanForm({ planAction }: { planAction: PlanAction | null }) {
    const [preview, setPreviewUrl] = useState<string | undefined>(undefined)
    const [file, setFile] = useState<File | null>(null)
    const [inputs, setInputs] = useState<FormInputs>({
        title: null,
        description: null,
        file: null
    })
    console.log('from form' + planAction);

    function handleInputsChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value, type, files } = e.target as HTMLInputElement & HTMLTextAreaElement;

        if (type === 'file' && files) {
            // Handle file input
            const file = files[0] || null;
            setInputs(prev => ({
                ...prev,
                [name]: file
            }));

        } else if (type !== 'file') {
            // Handle text input
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }
    const imageFile = useRef<HTMLInputElement>(null)

    const handleFileChange = () => {
        const fileitself = imageFile.current?.files?.[0]; // الحصول على الملف
        if (fileitself) {
            // التحقق من أن الملف ليس null
            setFile(fileitself);

            const imageUrl = URL.createObjectURL(fileitself); // إنشاء URL للصورة
            setPreviewUrl(imageUrl); // حفظ URL في الـ state لعرضها
        } else {
            setPreviewUrl(undefined); // مسح الـ preview إذا لم يكن هناك ملف
        }
    };
    const { toast } = useToast()
    let createWithImage
    if (file !== null) {
        const formData = new FormData(); // إنشاء FormData
        formData.append('image', file);
        if (inputs.title !== null) {
            formData.append('title', inputs.title);
        }

        if (inputs.description !== null) {
            formData.append('description', inputs.description);
        }

        if (inputs.file !== null) {
            formData.append('file', inputs.file);
        }

        createWithImage = Create_plan.bind(null, formData); // تمرير formData للدالة
    }
    // const createplanwithimage = Create_plan.bind(null, file)
    const actionForm = createWithImage ? createWithImage : Create_plan
    return <>
        <form action={async (formdata) => {
            await actionForm(formdata).then(() => {
                toast({
                    title: 'Plan Created',
                    description: 'The plan created successfully'
                })
            }).catch(error => {
                toast({
                    description: `Error: ${(error as Error).message}`,
                    variant: 'destructive' // Adjust the variant as needed for error messages
                });
            })
        }} className=''>
            <h1 className='text-xl font-semibold text-[#CB8C06]'>Create plan</h1>
            <div className=' mt-4 flex flex-col gap-4'>
                <Label htmlFor='title' >Title</Label>
                <Input defaultValue={planAction?.title} onChange={handleInputsChange} className='w-1/2' name='title' type='text' placeholder='Title' />
                <Label htmlFor='description'>Description</Label>
                <Textarea onChange={handleInputsChange} defaultValue={planAction?.description} name='description' placeholder='Type description here' className='w-1/2' />
                <Label htmlFor=''>Plant modification</Label>
                <Radio planAction={planAction} onChange={handleInputsChange} />
            </div>


            <div className='absolute bottom-5 left-4'>
                <Link className='px-5 py-2 text-[#f12e2e] border border-[#d31010] rounded hover:text-[#a82424]' href='/main/' >
                    Cancel</Link>
            </div>
            {(preview === undefined && !planAction?.image) ? <Label htmlFor='image' className='absolute border-2 border-dashed h-52 w-52 top-4 right-4
        flex items-center justify-center cursor-pointer hover:bg-gray-100
      '>
                <RiImageAddLine className='text-4xl text-gray-300' />
                <Input ref={imageFile} onChange={handleFileChange} className='hidden' id='image' type='file' name='image' />
            </Label> :
                <div className='absolute border-2  h-52 w-52 top-4 right-4 hover:bg-gray-100' >
                    <Image objectFit='fit' layout='fill' alt='image' priority src={planAction?.image || preview || ''} // provide a fallback string
 />
                </div>
            }
            {planAction ? (
                <Link className='bg-[#CB8C06] px-5 py-2 rounded-md text-white absolute bottom-3 right-4' href='/main/create-plan/program'>Next</Link>
            ) : (
                <Button className='absolute bottom-3 right-4'>Submit</Button>
            )}
        </form >
    </>
}
export default CreatePlanForm
