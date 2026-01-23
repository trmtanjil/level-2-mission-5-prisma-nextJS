"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {useForm} from "@tanstack/react-form"

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

const form = useForm ({
defaultValues : {
name:"",
email:"",
password:""
},
onSubmit : async ({value})=>{
  console.log("form submit ", value)
}
})

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit()
        }}>
  
  <button type="submit">submit</button>
        </form>
      </CardContent>
    </Card>
  )
}
