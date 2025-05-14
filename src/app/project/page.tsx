"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export interface Project {
  id: number;
  name: string;
  linkUrl: string;
  description: string;
  project_images: ProjectImage[];
}
export interface ProjectImage {
  id: number;
  image: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}
interface ImageLoadState {
  [projectId: number]: boolean;
}

export default function ProjectComponent() {
  const [projects, setProjects] = useState<Project[]>([]);

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
              className="grid gap-10 lg:grid-cols-12 items-start my-16"
            >
              {/* Image kiri */}
              {isEven && (
                <div className="text-center mx-auto lg:col-span-5 col-span-12">
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
                </div>
              )}

              {/* Text Content */}
              <div className="lg:col-span-7 col-span-12">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {project.linkUrl} ↗
                </a>
                <p className="text-gray-400 mt-4">{project.description}</p>
                <div className="flex justify-center lg:justify-start gap-4 mt-6 text-gray-600 text-xl">
                  <BsFacebook className="hover:text-blue-600 cursor-pointer" />
                  <BsInstagram className="hover:text-pink-500 cursor-pointer" />
                  <BsTwitter className="hover:text-sky-500 cursor-pointer" />
                  <BsGithub className="hover:text-gray-900 cursor-pointer" />
                  <BsDribbble className="hover:text-pink-400 cursor-pointer" />
                </div>
                <div className="mt-6 text-center lg:text-left">
                  <Button color="blue">View case study →</Button>
                </div>
              </div>

              {/* Image kanan */}
              {!isEven && (
                <div className="text-center mx-auto lg:col-span-5 col-span-12">
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
