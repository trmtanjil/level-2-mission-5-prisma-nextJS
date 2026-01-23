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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm} from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
 
const formSchema = z.object({
  name:z.string().min(1, "This feild is requred"),
  password:z.string().min(8,"This feild is required"),
  email:z.email()
})
export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

const form = useForm ({
defaultValues : {
name:"",
email:"",
password:""
},
validators:{
onSubmit:formSchema,
},
onSubmit : async ({value})=>{
 try{
  const toastid = toast.loading("createing user")
  const{data,error}= await  authClient.signUp.email(value)

  if(error){
    toast.error(error.message,{id:toastid})
    return
  }
  toast.success("user created successfully")
 }catch(errror){
  toast.error("somthing went wrong please try again", )
 }
}
})


  const handleGoogleLogin = async ()=>{
    const data = authClient.signIn.social({
      provider:"google",
      callbackURL:"http://localhost:3000"
    })
    console.log(data)
  }

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
          <form.Field name="name" children={(field)=>{
              const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
            return(
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input 
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)

                }
                /> 
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
              </Field>
            )
          }}/> 

           <form.Field name="email" children={(field)=>{
              const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
            return(
              <Field>
                <FieldLabel htmlFor={field.name}>Emial</FieldLabel>
                <Input 
                type="email"
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)

                }
                /> 
                  {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
              </Field>
            )
          }}/>

           <form.Field name="password" children={(field)=>{
              const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
            return(
              <Field>
                <FieldLabel htmlFor={field.name}>password</FieldLabel>
                <Input 
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)

                }
                /> 
                  {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
              </Field>
            )
          }}/>
        </FieldGroup>

        </form>
      </CardContent>
      <CardFooter>
 <div className="space-y-4 mt-6">
  {/* Submit button */}
  <Button
    form="login-form"
    type="submit"
    className="w-full h-11 text-base font-semibold rounded-md"
  >
    Create Account
  </Button>

  {/* Divider */}
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div>

  {/* Google button */}
  <Button
    type="button"
    variant="outline"
    onClick={handleGoogleLogin}
    className="w-full mx-auto h-11 flex items-center justify-center gap-2 rounded-md"
  >
    {/* Google Icon */}
    <svg
      className="h-4 w-4"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.03 1.53 7.42 2.8l5.46-5.46C33.14 3.44 28.96 1.5 24 1.5 14.73 1.5 6.98 6.98 3.96 14.92l6.53 5.07C12.3 14.04 17.68 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24c0-1.62-.15-3.18-.43-4.68H24v9.07h12.7c-.55 2.95-2.2 5.45-4.7 7.13l7.28 5.64C43.86 36.92 46.5 30.95 46.5 24z"
      />
      <path
        fill="#FBBC05"
        d="M10.49 28.99A14.5 14.5 0 0 1 9.5 24c0-1.73.3-3.4.85-4.99l-6.53-5.07A23.9 23.9 0 0 0 1.5 24c0 3.9.94 7.58 2.32 10.82l6.67-5.83z"
      />
      <path
        fill="#34A853"
        d="M24 46.5c6.48 0 11.92-2.14 15.9-5.82l-7.28-5.64c-2.02 1.36-4.6 2.16-8.62 2.16-6.32 0-11.7-4.54-13.51-10.49l-6.67 5.83C6.93 40.98 14.73 46.5 24 46.5z"
      />
    </svg>

    <span className="font-medium">Register with Google</span>
  </Button>
</div>

      </CardFooter>
    </Card>
  )
}
