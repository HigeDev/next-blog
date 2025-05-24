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
} from "react-icons/si";
import { TbApi, TbSeo, TbBrandVscode } from "react-icons/tb";
import { RiJavaFill } from "react-icons/ri";
import { useTheme } from "next-themes";

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
}
interface ImageLoadState {
  [projectId: number]: boolean;
}

export default function ProjectComponent() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/project/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit: 9, order: "asc" }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setProjects(data.allProjects);
        } else {
          console.error("Failed to fetch:", data);
        }
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
                <p className="text-gray-400 mt-4">{project.description}</p>
                <div className="flex flex-wrap justify-start gap-4 mt-6 text-3xl">
                  {project.project_skill.codeigniter && (
                    <div className="group relative flex flex-col items-center">
                      <SiCodeigniter className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        CodeIgniter
                      </span>
                    </div>
                  )}
                  {project.project_skill.codeigniter && (
                    <div className="group relative flex flex-col items-center">
                      <SiLaravel className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Laravel
                      </span>
                    </div>
                  )}
                  {project.project_skill.api && (
                    <div className="group relative flex flex-col items-center">
                      <TbApi className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        API
                      </span>
                    </div>
                  )}
                  {project.project_skill.mysql && (
                    <div className="group relative flex flex-col items-center">
                      <SiMysql className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        MySQL
                      </span>
                    </div>
                  )}
                  {project.project_skill.prisma && (
                    <div className="group relative flex flex-col items-center">
                      <SiPrisma className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Prisma
                      </span>
                    </div>
                  )}
                  {project.project_skill.typescript && (
                    <div className="group relative flex flex-col items-center">
                      <SiTypescript className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        TypeScript
                      </span>
                    </div>
                  )}
                  {project.project_skill.javascript && (
                    <div className="group relative flex flex-col items-center">
                      <SiJavascript className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        JavaScript
                      </span>
                    </div>
                  )}
                  {project.project_skill.tailwind && (
                    <div className="group relative flex flex-col items-center">
                      <SiTailwindcss className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        TailwindCSS
                      </span>
                    </div>
                  )}
                  {project.project_skill.bootstrap && (
                    <div className="group relative flex flex-col items-center">
                      <SiBootstrap className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Bootstrap
                      </span>
                    </div>
                  )}
                  {project.project_skill.figma && (
                    <div className="group relative flex flex-col items-center">
                      <SiFigma className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Figma
                      </span>
                    </div>
                  )}
                  {project.project_skill.seo && (
                    <div className="group relative flex flex-col items-center">
                      <TbSeo className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        SEO
                      </span>
                    </div>
                  )}
                  {project.project_skill.arduino && (
                    <div className="group relative flex flex-col items-center">
                      <SiArduino className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Arduino
                      </span>
                    </div>
                  )}
                  {project.project_skill.rstudio && (
                    <div className="group relative flex flex-col items-center">
                      <SiRstudioide className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        RStudio
                      </span>
                    </div>
                  )}
                  {project.project_skill.java && (
                    <div className="group relative flex flex-col items-center">
                      <RiJavaFill className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Java
                      </span>
                    </div>
                  )}
                  {project.project_skill.androidstudio && (
                    <div className="group relative flex flex-col items-center">
                      <SiAndroidstudio className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Android Studio
                      </span>
                    </div>
                  )}
                  {project.project_skill.git && (
                    <div className="group relative flex flex-col items-center">
                      <SiGit className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Git
                      </span>
                    </div>
                  )}
                  {project.project_skill.vscode && (
                    <div className="group relative flex flex-col items-center">
                      <TbBrandVscode className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        VSCode
                      </span>
                    </div>
                  )}
                  {project.project_skill.nextjs && (
                    <div className="group relative flex flex-col items-center">
                      <SiNextdotjs className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Next.js
                      </span>
                    </div>
                  )}
                  {project.project_skill.cisco && (
                    <div className="group relative flex flex-col items-center">
                      <SiCisco className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Cisco Packet Tracker
                      </span>
                    </div>
                  )}
                  {project.project_skill.matlab && (
                    <div className="group relative flex flex-col items-center">
                      <img
                        src={iconMatlab}
                        className="cursor-pointer text-4xl"
                        alt="Matlab icon"
                        width={40}
                        height={40}
                      />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Matlab
                      </span>
                    </div>
                  )}
                  {project.project_skill.flowbite && (
                    <div className="group relative flex flex-col items-center">
                      <img
                        src={iconFlowbite}
                        className="cursor-pointer text-4xl"
                        alt="Flowbite icon"
                        width={40}
                        height={40}
                      />
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Flowbite
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <Button color="blue">View case study →</Button>
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
