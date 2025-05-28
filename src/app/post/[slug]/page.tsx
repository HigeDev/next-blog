// app/post/[slug]/page.tsx
import ShowPostPage from "@/app/components/ShowPost";

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  return <ShowPostPage slug={params.slug} />;
}
