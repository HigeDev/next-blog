"use client";

import { useEffect, useState, use } from "react";
import CallToAction from "@/app/components/CallToAction";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Carousel,
} from "flowbite-react";
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
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { useTheme } from "next-themes";

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
  docker: boolean;
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // ← unwrap Promise dengan use()
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

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

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const nextImage = () => {
    if (selectedIndex !== null && project?.project_images) {
      setSelectedIndex((selectedIndex + 1) % project.project_images.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null && project?.project_images) {
      setSelectedIndex(
        (selectedIndex - 1 + project.project_images.length) %
          project.project_images.length
      );
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.post("/api/project/get", { slug });
        setProject(res.data.allProjects[0]);
      } catch (err: any) {
        console.error(err.message);
        setError("Failed to load project");
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    setMounted(true); // agar menghindari mismatch saat SSR
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const iconMatlab =
    currentTheme === "dark" ? "/matlab-light.png" : "/matlab-dark.png";
  const iconFlowbite =
    currentTheme === "dark" ? "/flowbite-light.png" : "/flowbite-dark.png";
  if (error || !project) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Project not found
        </h2>
      </main>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="p-3 border border-teal-500 rounded-tl-3xl rounded-br-3xl mb-4">
        <div className="max-w-2xl mx-auto text-center mb-0">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white mb-5">
            {project.name}
          </h2>
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-[16px]"
          >
            Project Link ↗
          </a>
        </div>
        <div className="flex justify-between p-0 mx-auto w-full max-w-3xl text-xs">
          <img
            src={`/uploads/${project.project_images[0].image}`}
            className="mt-2 p-3 max-h-[400px] w-full object-cover"
          />
        </div>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div
          className="p-3 max-w-3xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: project.description }}
        ></div>
      </div>
      <div className="text-3xl p-3 border border-teal-500 items-center text-center rounded-tl-3xl rounded-br-3xl">
        <h3>Tools :</h3>
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-2xl lg:text-5xl">
          {skillList.map(({ key, Icon, label }) =>
            project.project_skill[key as keyof ProjectSkill] ? (
              <div
                key={key}
                className="group relative flex flex-col items-center cursor-pointer"
                onClick={() =>
                  setSelectedSkill(selectedSkill === key ? null : key)
                }
              >
                <Icon className="text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300" />
                <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {label}
                </span>
                {selectedSkill === key && (
                  <span className="mt-2 text-sm text-blue-700 font-medium">
                    {label}
                  </span>
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="text-3xl p-3 border border-teal-500 rounded-tl-3xl rounded-br-3xl items-center text-center mt-10 mb-12">
        <div>
          <h3>Preview Image :</h3>
        </div>
        <div className="w-auto max-w-full flex py-2 flex-wrap justify-center gap-6">
          {project.project_images?.map((imgObj, index) => (
            <img
              key={index}
              src={`/uploads/${imgObj.image}`}
              alt={`${project.name} ${index + 1}`}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer border rounded shadow object-cover w-[300px] h-[200px] max-w-[300px] max-h-[200px] transition duration-300 ease-in-out hover:scale-125 hover:shadow-xl"
            />
          ))}
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        dismissible
        size="6xl"
      >
        <ModalHeader className="p-2">
          {project.name} - Preview Image
        </ModalHeader>
        <ModalBody className="p-2 max-h-[90vh] overflow-y-auto">
          {selectedIndex !== null && project.project_images && (
            <div className="group relative w-full max-w-7xl mx-auto max-h-[90vh]">
              <img
                src={`/uploads/${project.project_images[selectedIndex].image}`}
                alt={`Selected ${project.name}`}
                className="w-full h-auto max-h-[90vh] object-contain rounded"
              />

              {/* Tombol kiri */}
              <button
                onClick={prevImage}
                className="absolute top-0 left-0 w-[15%] h-full text-white flex items-center justify-start transition cursor-pointer"
              >
                <div className="w-full h-full opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-black/30 to-transparent flex items-center">
                  <span className="text-white text-3xl pl-2">
                    <FaCircleChevronLeft />
                  </span>
                </div>
              </button>

              {/* Tombol kanan */}
              <button
                onClick={nextImage}
                className="absolute top-0 right-0 w-[15%] h-full text-white flex items-center justify-end transition cursor-pointer"
              >
                <div className="w-full h-full opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-l from-black/30 to-transparent flex items-center justify-end">
                  <span className="text-white text-3xl pr-2">
                    <FaCircleChevronRight />
                  </span>
                </div>
              </button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </main>
  );
}
