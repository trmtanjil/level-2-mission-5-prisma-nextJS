import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constentse/roles";

export async function proxy(request:NextRequest){
    
    const pathName = request.nextUrl.pathname
    let isAuthenticated = false;
    let isAdmin = false;


    const {data} =await userService.getSession()

    if(data){
        isAuthenticated=true;
        isAdmin=data.user.role=== Roles.admin
    }
    if(!isAuthenticated){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    
    //chack admin 
    if(isAdmin && pathName.startsWith("/deshboard")){
        return NextResponse.redirect(new URL("/admin-deshboard",request.url))
    }

    //check user
    if(!isAdmin && pathName.startsWith("/admin-deshboard"))
{
    return NextResponse.redirect(new URL("/deshboard",request.url))
}

return NextResponse.next()
}

export  const config ={
    matcher:["/deshboard",
        "/deshboard/:path*",
        "/admin-deshboard",
        "/admin-deshboard/:path*"]
} 