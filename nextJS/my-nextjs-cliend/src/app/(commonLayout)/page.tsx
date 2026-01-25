 import BlogCard from "@/components/module/homepage/blogCard";
import { blogServices } from "@/services/blog.services";
import { BlogPost } from "@/types";
import Image from "next/image";
 
   


export default async function Home() {

  const featuredPostsPromise = blogServices.getBlogPosts({ isFeatured: true });
  const postsPromise = blogServices.getBlogPosts(
    { limit: "6" },
    { revalidate: 10 },
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);



  //  console.time("Sequential");

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // console.timeEnd("Sequential");

  //   console.time("Parallel");

  // const promise1 = new Promise((resolve) => setTimeout(resolve, 1000));
  // const promise2 = new Promise((resolve) => setTimeout(resolve, 2000));

  // await Promise.all([promise1, promise2]);

  // console.timeEnd("Parallel");


 
  return (

  <>


      <div className="mb-12 mt-8 h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="relative w-full h-96 mb-6">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100"
            alt="Hero"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* <Image
            src={coffee}
            fill
            alt="Hero"
            className="object-cover rounded-md"
          /> */}
          {/* <Image
            // src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          /> */}
        </div>
        <h1 className={"text-5xl font-bold text-center mb-4"}>
          Welcome to Our Blog
        </h1>
      </div>

      {featuredPosts?.data?.data && featuredPosts.data.data.length > 0 && (
        <div className="mb-12">
          <h2 className={"text-2xl font-bold mb-6"}>Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.data.data.slice(0, 2).map((post: BlogPost) => (
              <div key={post.id} className="border rounded-lg overflow-hidden">
                <img
                  // src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=100"
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}








    <div className="grid grid-cols-3 max-w-[90%] gap-3 justify-around mx-auto">
      {
        posts?.data?.data?.map((post:BlogPost)=>(
          <BlogCard key={post.id} post={post}></BlogCard>
        ))
      }
    </div>
  </>
  );
}
