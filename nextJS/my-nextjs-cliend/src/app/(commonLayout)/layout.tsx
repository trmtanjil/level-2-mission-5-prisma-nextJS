import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

export default function Commonlayout({children}:{children: React.ReactNode}) {
  return (
    <div>
        <h1> <Navbar></Navbar></h1>
        {children}
    </div>
  )
}
