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
  const { isSignedIn, user, isLoaded } = useUser();
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
      const res = await fetch("/api/project/create", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "Failed to publish.");
        return;
      }

      // router.push(`/dashboard}`);
    } catch (error) {
      setPublishError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Codeigniter"
              className="w-6 h-6"
              checked={formData.Codeigniter}
              onChange={(e) =>
                setFormData({ ...formData, Codeigniter: e.target.checked })
              }
            />
            <Label htmlFor="Codeigniter" className="relative">
              <SiCodeigniter className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                CodeIgniter
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Laravel"
              className="w-6 h-6"
              checked={formData.Laravel}
              onChange={(e) =>
                setFormData({ ...formData, Laravel: e.target.checked })
              }
            />
            <Label htmlFor="Laravel" className="relative">
              <SiLaravel className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Laravel
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="MySQL"
              className="w-6 h-6"
              checked={formData.MySQL}
              onChange={(e) =>
                setFormData({ ...formData, MySQL: e.target.checked })
              }
            />
            <Label htmlFor="MySQL" className="relative">
              <SiMysql className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                MySQL
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Prisma"
              className="w-6 h-6"
              checked={formData.Prisma}
              onChange={(e) =>
                setFormData({ ...formData, Prisma: e.target.checked })
              }
            />
            <Label htmlFor="Prisma" className="relative">
              <SiPrisma className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Prisma
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Typescript"
              className="w-6 h-6"
              checked={formData.Typescript}
              onChange={(e) =>
                setFormData({ ...formData, Typescript: e.target.checked })
              }
            />
            <Label htmlFor="Typescript" className="relative">
              <SiTypescript className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Typescript
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="JavaScript"
              className="w-6 h-6"
              checked={formData.Javascript}
              onChange={(e) =>
                setFormData({ ...formData, Javascript: e.target.checked })
              }
            />
            <Label htmlFor="JavaScript" className="relative">
              <SiJavascript className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                JavaScript
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Tailwind"
              className="w-6 h-6"
              checked={formData.Tailwind}
              onChange={(e) =>
                setFormData({ ...formData, Tailwind: e.target.checked })
              }
            />
            <Label htmlFor="Tailwind" className="relative">
              <SiTailwindcss className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Tailwind
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Bootstrap"
              className="w-6 h-6"
              checked={formData.Bootstrap}
              onChange={(e) =>
                setFormData({ ...formData, Bootstrap: e.target.checked })
              }
            />
            <Label htmlFor="Bootstrap" className="relative">
              <SiBootstrap className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Bootstrap
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="API"
              className="w-6 h-6"
              checked={formData.API}
              onChange={(e) =>
                setFormData({ ...formData, API: e.target.checked })
              }
            />
            <Label htmlFor="API" className="relative">
              <TbApi className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                API
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="NextJS"
              className="w-6 h-6"
              checked={formData.NextJS}
              onChange={(e) =>
                setFormData({ ...formData, NextJS: e.target.checked })
              }
            />
            <Label htmlFor="NextJS" className="relative">
              <SiNextdotjs className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                NextJS
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="SEO"
              className="w-6 h-6"
              checked={formData.SEO}
              onChange={(e) =>
                setFormData({ ...formData, SEO: e.target.checked })
              }
            />
            <Label htmlFor="SEO" className="relative">
              <TbSeo className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                SEO
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Figma"
              className="w-6 h-6"
              checked={formData.Figma}
              onChange={(e) =>
                setFormData({ ...formData, Figma: e.target.checked })
              }
            />
            <Label htmlFor="Figma" className="relative">
              <SiFigma className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Figma
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Arduino"
              className="w-6 h-6"
              checked={formData.Arduino}
              onChange={(e) =>
                setFormData({ ...formData, Arduino: e.target.checked })
              }
            />
            <Label htmlFor="Arduino" className="relative">
              <SiArduino className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Arduino
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Rstudio"
              className="w-6 h-6"
              checked={formData.Rstudio}
              onChange={(e) =>
                setFormData({ ...formData, Rstudio: e.target.checked })
              }
            />
            <Label htmlFor="Rstudio" className="relative">
              <SiRstudioide className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Rstudio
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Java"
              className="w-6 h-6"
              checked={formData.Java}
              onChange={(e) =>
                setFormData({ ...formData, Java: e.target.checked })
              }
            />
            <Label htmlFor="Java" className="relative">
              <RiJavaFill className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Java
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="AndroidStudio"
              className="w-6 h-6"
              checked={formData.AndroidStudio}
              onChange={(e) =>
                setFormData({ ...formData, AndroidStudio: e.target.checked })
              }
            />
            <Label htmlFor="AndroidStudio" className="relative">
              <SiAndroidstudio className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Android Studio
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="VSCode"
              className="w-6 h-6"
              checked={formData.VSCode}
              onChange={(e) =>
                setFormData({ ...formData, VSCode: e.target.checked })
              }
            />
            <Label htmlFor="VSCode" className="relative">
              <TbBrandVscode className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                VSCode
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Git"
              className="w-6 h-6"
              checked={formData.Git}
              onChange={(e) =>
                setFormData({ ...formData, Git: e.target.checked })
              }
            />
            <Label htmlFor="Git" className="relative">
              <SiGit className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Git
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Cisco"
              className="w-6 h-6"
              checked={formData.Cisco}
              onChange={(e) =>
                setFormData({ ...formData, Cisco: e.target.checked })
              }
            />
            <Label htmlFor="Cisco" className="relative">
              <SiCisco className="cursor-pointer text-4xl" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Cisco Packet Tracker
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Matlab"
              className="w-6 h-6"
              checked={formData.Matlab}
              onChange={(e) =>
                setFormData({ ...formData, Matlab: e.target.checked })
              }
            />
            <Label htmlFor="Matlab" className="relative">
              <img
                src={iconMatlab}
                className="cursor-pointer text-4xl"
                alt="Matlab icon"
                width={40}
                height={40}
              />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Matlab
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-3 relative group">
            <Checkbox
              id="Flowbite"
              className="w-6 h-6"
              checked={formData.Flowbite}
              onChange={(e) =>
                setFormData({ ...formData, Flowbite: e.target.checked })
              }
            />
            <Label htmlFor="Flowbite" className="relative">
              <img
                src={iconFlowbite}
                className="cursor-pointer text-4xl"
                alt="Flowbite icon"
                width={40}
                height={40}
              />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Flowbite
              </span>
            </Label>
          </div>
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
}
