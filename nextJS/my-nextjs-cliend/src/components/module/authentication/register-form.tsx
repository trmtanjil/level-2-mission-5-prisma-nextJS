"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import {Field, useForm} from "@tanstack/react-form"
 
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

        <form
        id="login-form"
        onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit()
        }}>
  
        <FieldGroup>
          <form.Field
          name="name" children={()=><Field></Field>}
          /> 
        </FieldGroup>

        </form>
      </CardContent>
      <CardFooter>
  <Button form="login-form" type="submit">submit</Button>

      </CardFooter>
    </Card>
  )
}
