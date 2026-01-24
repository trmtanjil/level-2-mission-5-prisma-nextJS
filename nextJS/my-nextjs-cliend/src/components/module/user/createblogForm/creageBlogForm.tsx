import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'

export default async function CreageBlogForm() {
    const crateBlog = async (formData:FormData)=>{
        "use server"

        console.log(formData.get("title"))

    }


  return (
    <div>
        <Card className='max-w-[20%] mx-auto'>
            <CardHeader>
                <CardTitle>This is card title</CardTitle>
            </CardHeader>
            <CardContent>
                <form id='bloge-form'
                action={crateBlog}
                >
    <FieldGroup>
        <FieldLabel>Title</FieldLabel>
        <Input type='text' name='title'></Input>
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
