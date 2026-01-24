import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { env } from '@/env'
import { cookies } from 'next/headers'
 import React from 'react'


const API_URL  = env.API_URL

export default async function CreageBlogForm() {
    const crateBlog = async (formData:FormData)=>{
        "use server"
        
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string ;
        
        const blogData ={
            title,
            content,
            tags:tags.split(",").map((item)=>item.trim())
        }

        const cookieStore = await cookies()
        const res = await fetch(`${API_URL}/post`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                cookie:cookieStore.toString()
            },
            body:JSON.stringify(blogData)
        })
        console.log(res)

    }


  return (
    <div>
        <Card className='max-w-[80%] mx-auto'>
            <CardHeader>
                <CardTitle>This is card title</CardTitle>
            </CardHeader>
            <CardContent>
                <form id='bloge-form'
                action={crateBlog}
                >
    <FieldGroup>
       <Field>
         <FieldLabel>Title</FieldLabel>
        <Textarea 
         name='title'
        id='title'
        placeholder='title requered'
        required
        ></Textarea>
       </Field>
         <Field>
         <FieldLabel>Content</FieldLabel>
        <Input type='text'
         name='content'
        id='content'
        placeholder='write your bloge'
        required
        ></Input>
       </Field>
         <Field>
         <FieldLabel>Tags(coma separated)</FieldLabel>
        <Input  
         name='tags'
        id='tags'
        placeholder='Next.js, dev'
        required
        ></Input>
       </Field>
    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form='bloge-form' type='submit' 
                className='w-full'
                >Submit</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
