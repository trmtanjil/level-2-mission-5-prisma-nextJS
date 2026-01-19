import Link from 'next/link'
import React from 'react'

export default function precticeLayout({
    children,
    marketingSlot,
    selesSlot
}:{
    children: React.ReactNode;
    marketingSlot:React.ReactNode;
    selesSlot:React.ReactNode
}) {
  return (
    <div> 
        <div className='flex justify-between '>
            <Link className='hover:underline items-center border-4 p-4 text-center' href={'/development'}>development</Link>
            <Link className='hover:underline items-center border-4 p-4 text-center' href={'/development/test'}>test</Link>
             <Link className='hover:underline items-center border-4 p-4 text-center' href={'/marketing'}>marketing</Link>
               <Link className='hover:underline items-center border-4 p-4 text-center' href={'/marketing/setting'}>marketing setting</Link>
              <Link className='hover:underline items-center border-4 p-4 text-center' href={'/seles'}>seles</Link>
        </div>
       <div className='flex'>
         {marketingSlot}
        {selesSlot}
       </div>
        {children}
    </div>
  )
}
