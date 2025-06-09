"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import Link from "next/link";
import {
  SiCodeigniter,
  SiLaravel,
  SiMysql,
  SiPrisma,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiFigma,
  SiArduino,
  SiRstudioide,
  SiAndroidstudio,
  SiGit,
  SiNextdotjs,
  SiCisco,
  SiDocker,
} from "react-icons/si";
import { TbApi, TbSeo, TbBrandVscode } from "react-icons/tb";
import { RiJavaFill } from "react-icons/ri";
import { useTheme } from "next-themes";
import axios from "axios";

export interface Project {
  id: number;
  name: string;
  slug: string;
  linkUrl: string;
  description: string;
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
  cisco: boolean;
  docker: boolean;
}
interface ImageLoadState {
  [projectId: number]: boolean;
}

export default function ProjectClient() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const skillList = [
    { key: "codeigniter", Icon: SiCodeigniter, label: "CodeIgniter" },
    { key: "laravel", Icon: SiLaravel, label: "Laravel" },
    { key: "api", Icon: TbApi, label: "API" },
    { key: "mysql", Icon: SiMysql, label: "MySQL" },
    { key: "prisma", Icon: SiPrisma, label: "Prisma" },
    { key: "typescript", Icon: SiTypescript, label: "TypeScript" },
    { key: "javascript", Icon: SiJavascript, label: "JavaScript" },
    { key: "tailwind", Icon: SiTailwindcss, label: "TailwindCSS" },
    { key: "bootstrap", Icon: SiBootstrap, label: "Bootstrap" },
    { key: "figma", Icon: SiFigma, label: "Figma" },
    { key: "seo", Icon: TbSeo, label: "SEO" },
    { key: "arduino", Icon: SiArduino, label: "Arduino" },
    { key: "rstudio", Icon: SiRstudioide, label: "RStudio" },
    { key: "java", Icon: RiJavaFill, label: "Java" },
    { key: "androidstudio", Icon: SiAndroidstudio, label: "Android Studio" },
    { key: "git", Icon: SiGit, label: "Git" },
    { key: "vscode", Icon: TbBrandVscode, label: "VSCode" },
    { key: "nextjs", Icon: SiNextdotjs, label: "Next.js" },
    { key: "cisco", Icon: SiCisco, label: "Cisco Packet Tracker" },
    { key: "docker", Icon: SiDocker, label: "Docker" },

    // Skill dengan icon gambar khusus
    {
      key: "matlab",
      Icon: () => (
        <img src={iconMatlab} alt="Matlab icon" width={35} height={35} />
      ),
      label: "Matlab",
    },
    {
      key: "flowbite",
      Icon: () => (
        <img src={iconFlowbite} alt="Flowbite icon" width={35} height={35} />
      ),
      label: "Flowbite",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "/api/project/get",
          { limit: 50, order: "desc" },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = res.data;
        console.log(data);
        setProjects(data.allProjects);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const [hasLoaded, setHasLoaded] = useState<ImageLoadState>({});

  useEffect(() => {
    if (projects.length > 0) {
      const loadedState: ImageLoadState = {};
      projects.forEach((p) => {
        loadedState[p.id] = true;
      });
      setHasLoaded(loadedState);
    }
  }, [projects]);

  useEffect(() => {
    setMounted(true); // agar menghindari mismatch saat SSR
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const iconMatlab =
    currentTheme === "dark" ? "/matlab-light.png" : "/matlab-dark.png";
  const iconFlowbite =
    currentTheme === "dark" ? "/flowbite-light.png" : "/flowbite-dark.png";

  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        {/* name */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Project
          </h2>
          <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Crafted with skill and care to help our clients grow their business!
          </p>
        </div>

        {/* Projects List */}
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const firstImage = project.project_images[0];
          const imgUrl = firstImage
            ? `/uploads/${firstImage.image}`
            : "/uploads/DefaultImage.png";

          return (
            <div
              key={project.id}
              className="grid gap-5 lg:grid-cols-12 items-start my-16"
            >
              {/* Image kiri */}
              {isEven && (
                <div className="text-center mx-auto lg:col-span-5 col-span-12 order-1 lg:order-none">
                  <Link href={`/project/show/${project.slug}`}>
                    <img
                      src={imgUrl}
                      alt={project.name}
                      className={`w-110 h-80 rounded-2xl border-4 border-white object-cover mx-auto 
                transition duration-1000 ease-in-out transform 
                hover:scale-110 hover:rotate-12 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]
                ${
                  hasLoaded[project.id]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-40"
                }`}
                    />
                  </Link>
                </div>
              )}

              {/* Text Content */}
              <div className="lg:col-span-7 col-span-12 order-2 lg:order-none">
                <Link href={`/project/show/${project.slug}`}>
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                </Link>
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {project.linkUrl} ↗
                </a>
                <p
                  className="text-gray-400 mt-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      project.description
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                        .substring(0, 150) +
                      (project.description.replace(/<[^>]+>/g, " ").trim()
                        .length > 150
                        ? "..."
                        : ""),
                  }}
                ></p>

                <div className="flex flex-wrap justify-start gap-4 mt-6 text-3xl">
                  {skillList.map(({ key, Icon, label }) =>
                    project.project_skill[key as keyof ProjectSkill] ? (
                      <div
                        key={key}
                        className="group relative flex flex-col items-center cursor-pointer"
                      >
                        <Icon className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300" />
                        <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <Link href={`/project/show/${project.slug}`}>
                    <Button className="cursor-pointer" color="blue">
                      View case study →
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image kanan */}
              {!isEven && (
                <div className="text-center mx-auto lg:col-span-5 col-span-12 order-1 lg:order-none">
                  <Link href={`/project/show/${project.slug}`}>
                    <img
                      src={imgUrl}
                      alt={project.name}
                      className={`w-110 h-80 rounded-2xl border-4 border-white object-cover mx-auto 
                transition duration-1000 ease-in-out transform 
                hover:scale-110 hover:-rotate-12 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]
                ${
                  hasLoaded[project.id]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-40"
                }`}
                    />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
