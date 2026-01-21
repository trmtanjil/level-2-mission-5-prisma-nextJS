 import { Button } from "@/components/ui/button";
import { blogServices } from "@/services/blog.services";
   


export default async function Home() {

 const {data}=await blogServices.getBlogPosts()
 console.log(data)
 
  return (
    <div>
      <Button>Click heare</Button>
    </div>
  );
}
