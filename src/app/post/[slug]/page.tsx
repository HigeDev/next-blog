"use client";

import React, { useEffect, useState, use } from "react";
import CallToAction from "@/app/components/CallToAction";
import RecentPosts from "@/app/components/RecentPost";
import { Button } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import ShowPostPage from "@/app/components/ShowPost";

interface Post {
  id: number;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
interface PostPageProps {
  params: { slug: string };
}
export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // <-- unwrap Promise

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const result = await axios.post(
          "/api/post/get",
          { slug },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = result.data;
        setPost(data.posts[0]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Loading...
        </h2>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>
      <Link
        href={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>
      <img
        src={`/uploads/${post.image}`}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}
