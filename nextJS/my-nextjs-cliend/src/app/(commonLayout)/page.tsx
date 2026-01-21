 import BlogCard from "@/components/module/homepage/blogCard";
import { Button } from "@/components/ui/button";
import { blogServices } from "@/services/blog.services";
import { BlogPost } from "@/types";
   


export default async function Home() {

 const {data}=await blogServices.getBlogPosts({
  isFeatured:false,
 },{
  cache:"no-store"
 })
 console.log(data)
 
  return (
    <div className="grid grid-cols-3 max-w-[90%] gap-3 justify-around mx-auto">
      {
        data?.data?.map((post:BlogPost)=>(
          <BlogCard key={post.id} post={post}></BlogCard>
        ))
      }
    </div>
  );
}
