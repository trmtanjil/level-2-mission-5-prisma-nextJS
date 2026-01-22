import { blogServices } from '@/services/blog.services';
import React from 'react';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/types';


// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams(){
//   const {data}= await blogServices.getBlogPosts();

//   return data?.data?.map((post:BlogPost)=>({id:post.id}))
// }



export default async function BlogPage({ params }:
   { params: Promise<{ id: string }> }) {
  // ১. প্যারামস থেকে ID টি বের করে নেওয়া
  const { id } = await params;

  // ২. সার্ভিস থেকে ডাটা ফেচ করা
  const { data: post, error } = await blogServices.getBlogById(id);

  const {data}= await blogServices.getBlogPosts();
  const arrayofid  =  data?.data?.slice(0,3).map((post:BlogPost)=>({id:post.id}))
  console.log('arrayofid', arrayofid)

  // ৩. যদি ডাটা না পাওয়া যায় বা এরর হয়
  if (error || !post) {
    return notFound(); // ৪০৪ পেজ দেখাবে
  }






  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* থাম্বনেইল থাকলে দেখাবে */}
      {post.thumbnail && (
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-64 object-cover rounded-lg mb-6" 
        />
      )}

      {/* টাইটেল এবং স্ট্যাটাস */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {post.status}
          </span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>Views: {post.views}</span>
        </div>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <article className="prose lg:prose-xl max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          {post.content}
        </p>
      </article>

      {/* ট্যাগস */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* কমেন্ট কাউন্ট (অপশনাল) */}
      <div className="mt-10 pt-6 border-t">
         <p className="font-semibold text-gray-600">
            Comments: {post._count?.coments || 0}
         </p>
      </div>
    </main>
  );
}