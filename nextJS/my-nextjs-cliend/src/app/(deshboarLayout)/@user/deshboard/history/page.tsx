import { HistoryTable } from '@/components/module/user/createblogForm/history/historytable';
import { blogServices } from '@/services/blog.services';
 

export default async function HistoryPage({searchParams}:{searchParams:Promise<{page:string}>}) {

  const {page}=await searchParams
  console.log(page)

  const responst = await blogServices.getBlogPosts({page});
  const posts = responst.data?.data ||[]

 
  return (
    <div>this is HistoryPage
   <HistoryTable posts={posts}></HistoryTable>
    </div>
  )
}
