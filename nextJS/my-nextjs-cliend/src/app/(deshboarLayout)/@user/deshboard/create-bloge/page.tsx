import CreageBlogForm from '@/components/module/user/createblogForm/creageBlogForm'
import { blogServices } from '@/services/blog.services'
import { BlogPost } from '@/types'
import React from 'react'

export default async function CreateBlog() {
  const {data}= await blogServices.getBlogPosts({},{cache:"no-store"})
  console.log(data)
  return (
    <div>
      <CreageBlogForm></CreageBlogForm>
      {
        data.data.map((item:BlogPost)=>(
          <p key={item.id}>{item.title}</p>
        ))
      }
    </div>
  )
}
