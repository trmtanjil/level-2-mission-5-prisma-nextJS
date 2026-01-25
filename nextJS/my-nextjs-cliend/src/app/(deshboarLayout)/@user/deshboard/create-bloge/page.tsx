import CreageBlogForm from '@/components/module/user/createblogForm/creageBlogForm'
import { CreageBlogFormClient } from '@/components/module/user/createblogForm/CreateBlogFormClient'
import { blogServices } from '@/services/blog.services'
 

export default async function CreateBlog() {
  const {data}= await blogServices.getBlogPosts()
  return (
    <div className='mx-auto w-full flex justify-center'>
      {/* <CreageBlogForm></CreageBlogForm>\ */}
      <CreageBlogFormClient></CreageBlogFormClient>
      
    </div>
  )
}
