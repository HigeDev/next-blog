import Link from "next/link";
import { Badge } from "flowbite-react";

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

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getBadgeColor = (category: string): string => {
    switch (category) {
      case "Personal Life":
        return "purple";
      case "Stock":
        return "warning";
      case "Programming":
        return "success";
      case "Work":
        return "gray";
      case "Holiday":
        return "pink";
      case "Hobby":
        return "info";
      case "Japan":
        return "indigo";
      case "Other":
        return "dark";
      default:
        return "gray";
    }
  };
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link href={`/post/${post.slug}`}>
        <img
          src={`/uploads/${post.image}`}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm w-fit">
          <Link href={`/search?category=${post.category}`}>
            <Badge color={getBadgeColor(post.category)} className="w-fit">
              {post.category}
            </Badge>
          </Link>
        </span>

        <Link
          href={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
