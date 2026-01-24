import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function CreageBlogForm() {
  return (
    <div>
        <Card className='max-w-[20%]'>
            <CardHeader>
                <CardTitle>This is card title</CardTitle>
            </CardHeader>
            <CardContent>
                <form id='bloge-form'>

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
