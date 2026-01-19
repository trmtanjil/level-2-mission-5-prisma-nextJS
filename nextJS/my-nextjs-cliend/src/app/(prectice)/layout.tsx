import Link from 'next/link'
import React from 'react'

export default function precticeLayout({children}:{children: React.ReactNode}) {
  return (
    <div> 
        <div className='flex justify-between '>
            <Link className='hover:underline items-center border-4 p-4 text-center' href={'/development'}>development</Link>
             <Link className='hover:underline items-center border-4 p-4 text-center' href={'/marketing'}>marketing</Link>
               <Link className='hover:underline items-center border-4 p-4 text-center' href={'/marketing/setting'}>marketing setting</Link>
              <Link className='hover:underline items-center border-4 p-4 text-center' href={'/seles'}>seles</Link>
        </div>
        {children}
    </div>
  )
}
