import CreageBlogForm from '@/components/module/user/createblogForm/creageBlogForm'
import { CreageBlogFormClient } from '@/components/module/user/createblogForm/CreateBlogFormClient'
import { blogServices } from '@/services/blog.services'
import { BlogPost } from '@/types'
import React from 'react'

export default async function CreateBlog() {
  const {data}= await blogServices.getBlogPosts()
  console.log(data)
  return (
    <div>
      {/* <CreageBlogForm></CreageBlogForm>\ */}
      <CreageBlogFormClient></CreageBlogFormClient>
      {
        data.data.map((item:BlogPost)=>(
          <p key={item.id}>{item.title}</p>
        ))
      }
    </div>
  )
}
