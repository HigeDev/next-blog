import CallToAction from "@/app/components/CallToAction";
import Image from "next/image";

export interface Project {
  id: number;
  name: string;
  slug: string;
  linkUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  project_images: ProjectImage[];
  project_skill: ProjectSkill;
}
export interface ProjectImage {
  id: number;
  image: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}
export interface ProjectSkill {
  id: number;
  codeigniter: boolean;
  laravel: boolean;
  mysql: boolean;
  prisma: boolean;
  typescript: boolean;
  javascript: boolean;
  tailwind: boolean;
  bootstrap: boolean;
  api: boolean;
  nextjs: boolean;
  seo: boolean;
  flowbite: boolean;
  figma: boolean;
  matlab: boolean;
  arduino: boolean;
  rstudio: boolean;
  java: boolean;
  androidstudio: boolean;
  vscode: boolean;
  git: boolean;
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { params } = props;
  const { slug } = await params; // <<< AWAIT di sini

  let project: Project | null = null;
  try {
    const result = await fetch(`${process.env.URL}/api/project/get`, {
      method: "POST",
      body: JSON.stringify({ slug }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    project = data.allProjects[0];
  } catch (error: any) {
    console.error(error.message);
  }

  if (!project || project.name === "Failed to load post") {
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
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {project.name}
        </h2>
        <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
          Crafted with skill and care to help our clients grow their business!
        </p>
      </div>
      <Image
        src={`/uploads/${project.project_images[0].image}`}
        width={1200}
        height={600}
        alt={project.name}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {/* {(post.content.length / 1000).toFixed(0)} mins read */}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        // dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}
