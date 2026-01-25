import {  blogServices } from '@/services/blog.services'
import { HistoryTable } from '../../history/historytable';
 

export default async function HistoryPage() {

  const responst = await blogServices.getBlogPosts();
  const posts = responst.data?.data ||[]

  console.log("post",posts)

  return (
    <div>this is HistoryPage
   <HistoryTable posts={posts}></HistoryTable>
    </div>
  )
}
