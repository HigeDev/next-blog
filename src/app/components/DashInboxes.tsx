"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
type InboxItem = {
  id: number;
  subject: string;
  message: string;
  createdAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    profilePicture: string | null;
  };
};
export default function DashInboxes() {
  const { user } = useUser();
  const [inboxData, setInboxData] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);
  const [postImgToDelete, setPostImgToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.post("/api/inbox/get", {
          headers: { "Content-Type": "application/json" },
        });
        setInboxData(res.data.inboxes);
      } catch (error: any) {
        console.error(
          "Failed to fetch inbox:"
          // error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleDeletePost = async () => {
    setShowModal(false);
  };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className=" md:mx-auto ">
      <Link href={`/dashboard/create-post`} className="btn">
        Create Post
      </Link>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {inboxData.length > 0 ? (
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableRow>
                <TableHeadCell>Date created</TableHeadCell>
                <TableHeadCell>User image</TableHeadCell>
                <TableHeadCell>user</TableHeadCell>
                <TableHeadCell>Subject</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                <TableHeadCell>
                  <span>Edit</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {inboxData.map((item) => (
                <TableRow
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href="#">
                      <img
                        src={item.user.profilePicture ?? "/default-profile.png"}
                        alt={item.user.email ?? "User"}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {item.user.firstName} {item.user.lastName} (
                    {item.user.email})
                  </TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link className="text-teal-500 hover:underline" href="#">
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>You have no inbox yet!</p>
        )}

        <Modal
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
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeletePost}>
                  Yes, I&apos;m sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
