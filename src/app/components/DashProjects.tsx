"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  slug: string;
  updatedAt: string;
  project_images: ProjectImage[];
}
export interface ProjectImage {
  id: number;
  image: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}
export default function DashProjects() {
  const { user } = useUser();
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  // const [showModal, setShowModal] = useState(false);
  // const [projectIdToDelete, setProjectIdToDelete] = useState<number | null>(
  //   null
  // );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userId,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setUserProjects(data.allProjects);
        }
        console.log(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    if (user?.publicMetadata?.isAdmin) {
      fetchProjects();
    }
  }, [user?.publicMetadata?.isAdmin, user?.publicMetadata?.userId]);

  //   const handleDeleteProject = async () => {
  //     setShowModal(false);
  //     try {
  //       const res = await fetch("/api/project/delete", {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           projectId: projectIdToDelete,
  //           userId: user?.publicMetadata?.userId,
  //         }),
  //       });

  //       const data = await res.json();
  //       if (res.ok) {
  //         const newProjects = userProjects.filter(
  //           (project) => project.id !== projectIdToDelete
  //         );
  //         setUserProjects(newProjects);
  //       } else {
  //         console.error(data.message);
  //       }
  //     } catch (error: any) {
  //       console.error(error.message);
  //     }
  //   };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className=" md:mx-auto ">
      <Link href={`/dashboard/create-project`} className="btn">
        Create Project
      </Link>
      <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {userProjects.length > 0 ? (
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Post image</TableHeadCell>
                <TableHeadCell>Project name</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                <TableHeadCell>
                  <span>Edit</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {userProjects.map((project) => (
                <TableRow
                  key={project.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/project/${project.slug}`}>
                      <Image
                        src={`/uploads/${project.project_images[0].image}`}
                        width={80}
                        height={40}
                        alt={project.name}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      href={`/project/${project.slug}`}
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      //   onClick={() => {
                      //     setShowModal(true);
                      //     setProjectIdToDelete(project.id);
                      //   }}
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="text-teal-500 hover:underline"
                      href={`/dashboard/update-project/${project.id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>You have no projects yet!</p>
        )}

        {/* <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteProject}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      </div>
    </div>
  );
}
