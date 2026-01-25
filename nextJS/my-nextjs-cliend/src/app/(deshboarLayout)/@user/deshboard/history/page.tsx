import { HistoryTable } from '@/components/module/user/createblogForm/history/historytable';
import PaginationControls from '@/components/ui/paginationControls';
import { blogServices } from '@/services/blog.services';
 

export default async function HistoryPage({searchParams}:{searchParams:Promise<{page:string}>}) {

  const {page}=await searchParams
  

  const response = await blogServices.getBlogPosts({page});
  const posts = response.data?.data ||[]

  const pagination = response.data?.pagination||{
    limit:10,
    page:1,
    total:0,
    totalpage:1,
  }

 
  return (
    <div>this is HistoryPage
   <HistoryTable posts={posts}></HistoryTable>
   <PaginationControls meta={pagination}/>
    </div>
  )
}
