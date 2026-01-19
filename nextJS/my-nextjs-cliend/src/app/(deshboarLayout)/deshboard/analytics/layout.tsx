 import { AppSidebar } from "@/components/app-sidebar"
import { BreadcrumbItem } from "@/components/ui/breadcrumb"
 import {
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
 } from "@/components/ui/sidebar"
import { link } from "fs"
import Link from "next/link"
 import { Children } from "react"

export default function analyticsLayout({children}:{children:React.ReactNode}) {


   const menu = [
    { title: "weekly", url: "/deshboard/analytics/weekly" },
        { title: "monthly", url: "/deshboard/analytics/monthly" },
   ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
            <SidebarMenu>
                {menu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
         <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
