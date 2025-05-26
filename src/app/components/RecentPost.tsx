import PostCard from "./PostCard";
import axios from "axios";

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
const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.API_BASE_URL
  : process.env.NEXT_PUBLIC_API_BASE_URL;
export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts: Post[] | null = null;

  try {
    const result = await axios.post(`${baseURL}/api/post/get`, {
      limit: limit,
      order: "desc",
    });

    const data = result.data;
    posts = data.posts;
  } catch (error) {
    console.log("Error getting posts:", error);
  }

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
