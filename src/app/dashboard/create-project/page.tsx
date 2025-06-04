"use client";
import { useUser } from "@clerk/nextjs";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useDropzone } from "react-dropzone";
import { Alert, Button, TextInput, Label, Checkbox } from "flowbite-react";
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
import axios from "axios";

type FormDataFields = {
  name: string;
  description: string;
  linkURL: string;
  Codeigniter: boolean;
  Laravel: boolean;
  MySQL: boolean;
  Prisma: boolean;
  Typescript: boolean;
  Javascript: boolean;
  Tailwind: boolean;
  Bootstrap: boolean;
  API: boolean;
  NextJS: boolean;
  SEO: boolean;
  Figma: boolean;
  Arduino: boolean;
  Rstudio: boolean;
  Java: boolean;
  AndroidStudio: boolean;
  VSCode: boolean;
  Git: boolean;
  Matlab: boolean;
  Flowbite: boolean;
  Cisco: boolean;
};
export default function CreateProjectPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataFields>({
    name: "",
    description: "",
    linkURL: "",
    Codeigniter: false,
    Laravel: false,
    MySQL: false,
    Prisma: false,
    Typescript: false,
    Javascript: false,
    Tailwind: false,
    Bootstrap: false,
    API: false,
    NextJS: false,
    SEO: false,
    Figma: false,
    Arduino: false,
    Rstudio: false,
    Java: false,
    AndroidStudio: false,
    VSCode: false,
    Git: false,
    Matlab: false,
    Flowbite: false,
    Cisco: false,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);

    const filePreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...filePreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // agar menghindari mismatch saat SSR
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const iconMatlab =
    currentTheme === "dark" ? "/matlab-light.png" : "/matlab-dark.png";
  const iconFlowbite =
    currentTheme === "dark" ? "/flowbite-light.png" : "/flowbite-dark.png";

  const skills = [
    { id: "Codeigniter", label: "CodeIgniter", icon: <SiCodeigniter /> },
    { id: "Laravel", label: "Laravel", icon: <SiLaravel /> },
    { id: "MySQL", label: "MySQL", icon: <SiMysql /> },
    { id: "Prisma", label: "Prisma", icon: <SiPrisma /> },
    { id: "Typescript", label: "Typescript", icon: <SiTypescript /> },
    { id: "Javascript", label: "JavaScript", icon: <SiJavascript /> },
    { id: "Tailwind", label: "Tailwind", icon: <SiTailwindcss /> },
    { id: "Bootstrap", label: "Bootstrap", icon: <SiBootstrap /> },
    { id: "API", label: "API", icon: <TbApi /> },
    { id: "NextJS", label: "NextJS", icon: <SiNextdotjs /> },
    { id: "SEO", label: "SEO", icon: <TbSeo /> },
    { id: "Figma", label: "Figma", icon: <SiFigma /> },
    { id: "Arduino", label: "Arduino", icon: <SiArduino /> },
    { id: "Rstudio", label: "Rstudio", icon: <SiRstudioide /> },
    { id: "Java", label: "Java", icon: <RiJavaFill /> },
    { id: "AndroidStudio", label: "Android Studio", icon: <SiAndroidstudio /> },
    { id: "VSCode", label: "VSCode", icon: <TbBrandVscode /> },
    { id: "Git", label: "Git", icon: <SiGit /> },
    { id: "Cisco", label: "Cisco Packet Tracker", icon: <SiCisco /> },
    {
      id: "Matlab",
      label: "Matlab",
      icon: <img src={iconMatlab} width={40} height={40} alt="Matlab icon" />,
    },
    {
      id: "Flowbite",
      label: "Flowbite",
      icon: (
        <img src={iconFlowbite} width={40} height={40} alt="Flowbite icon" />
      ),
    },
  ];

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPublishError(null);
    if (images.length === 0) return;
    const formDataToSend = new FormData();
    // Validasi sederhana
    if (!formData.name || !formData.description) {
      setPublishError("Please fill all fields.");
      return;
    }
    images.forEach((file) => {
      formDataToSend.append("images", file);
    });
    formDataToSend.append("userId", String(user?.publicMetadata?.userId || ""));
    for (const key in formData) {
      const value = formData[key as keyof FormDataFields];
      formDataToSend.append(key, String(value));
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/project/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      console.log(data);
      router.push(`/project/show/${data.slug}`);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong.";
      setPublishError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Upload Filament Images</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              name="name"
              type="text"
              placeholder="name"
              required
              value={formData.name}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              name="description"
              type="text"
              placeholder="description"
              required
              value={formData.description}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              name="linkURL"
              type="text"
              placeholder="linkURL"
              required
              value={formData.linkURL}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, linkURL: e.target.value })
              }
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 w-full">
            {skills.map(({ id, label, icon }) => (
              <div key={id} className="flex items-center gap-3 relative group">
                <Checkbox
                  id={id}
                  className="w-6 h-6"
                  checked={formData[id as keyof FormDataFields] as boolean}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [id as keyof FormDataFields]: e.target.checked,
                    })
                  }
                />
                <Label htmlFor={id} className="relative">
                  <div className="cursor-pointer text-4xl">{icon}</div>
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    {label}
                  </span>
                </Label>
              </div>
            ))}
          </div>

          <div className="p-4 border rounded-lg">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-sm text-gray-500">
                {isDragActive
                  ? "Drop the files here..."
                  : "Drag & drop images here, or click to select files"}
              </p>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-32 object-cover rounded border-2"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  } else {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }
}
