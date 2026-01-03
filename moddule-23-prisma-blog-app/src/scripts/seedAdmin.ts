import { error } from "node:console";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middalewared/auth";

async function seedAdmin() {
    try{
        const adminData={
            name:'Admin1 trm',
            email:"admin1@admin.com",
            role:UserRole.ADMIN,
            password:"admin123"
        }
// check user exist on db or not 
const existinUser = await prisma.user.findUnique({
    where:{
        email:adminData.email
    }
});
if(existinUser){
    throw new Error("user already exists!!")
}
const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(adminData)
})

if(signUpAdmin.ok){
    console.log('******* admin created')
    await prisma.user.update({
        where:{
            email:adminData.email
        },
        data:{
            emailVerified:true
        }
    })
    console.log('**8 email varifyd true success')
}
console.log('successed')
    }catch(err){
        console.log(err)
    }
}
seedAdmin()