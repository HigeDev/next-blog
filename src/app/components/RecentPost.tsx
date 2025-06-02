"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface RecentPostsProps {
  limit: number;
}

export default function RecentPosts({ limit }: RecentPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios.post("/api/post/get", {
          limit,
          order: "desc",
        });
        setPosts(result.data.posts);
      } catch (error) {
        console.error("Error getting posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
HEAD
  }, []);

  }, [posts]);
51c8cd0adedc2677c5697088fcc2122b9f7ca889

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
