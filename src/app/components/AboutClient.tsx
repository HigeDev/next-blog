"use client";
import { BsInstagram, BsGithub, BsTwitterX, BsYoutube } from "react-icons/bs";
import { Button, Label, Textarea, TextInput, Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
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
  SiWhatsapp,
  SiDocker,
} from "react-icons/si";
import {
  TbApi,
  TbSeo,
  TbBrandVscode,
  TbDownload,
  TbMail,
} from "react-icons/tb";
import { RiJavaFill, RiHistoryFill } from "react-icons/ri";
import { useTheme } from "next-themes";

export default function AboutClient() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [inboxes, setInboxes] = useState([]);
  const [inboxCount, setInboxCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [publishAlert, setPublishAlert] = useState<{
    message: string;
    status: "success" | "failure";
  } | null>(null);
  const [success, setSuccess] = useState(false);
  const { isSignedIn, user } = useUser();
  const skills = [
    { icon: SiCodeigniter, label: "CodeIgniter" },
    { icon: SiLaravel, label: "Laravel" },
    { icon: TbApi, label: "API" },
    { icon: SiMysql, label: "MySQL" },
    { icon: SiPrisma, label: "Prisma" },
    { icon: SiTypescript, label: "TypeScript" },
    { icon: SiJavascript, label: "JavaScript" },
    { icon: SiTailwindcss, label: "TailwindCSS" },
    { icon: SiBootstrap, label: "Bootstrap" },
    { icon: SiFigma, label: "Figma" },
    // { icon: TbSeo, label: "SEO" },
    { icon: SiRstudioide, label: "RStudio" },
    { icon: SiGit, label: "Git" },
    { icon: TbBrandVscode, label: "VSCode" },
    { icon: SiNextdotjs, label: "Next.js" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiArduino, label: "Arduino" },
    { icon: SiCisco, label: "Cisco Packet Tracker" },
    { icon: SiAndroidstudio, label: "Android Studio" },
    { icon: RiJavaFill, label: "Java" },
  ];
  useEffect(() => {
    if (publishAlert) {
      const timer = setTimeout(() => {
        setPublishAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [publishAlert]);
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.post(
          "/api/inbox/get",
          {
            user: String(user?.publicMetadata?.userId || ""),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setInboxes(res.data.inboxs);
        setInboxCount(res.data.inboxCount);
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
  }, [publishAlert]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent mismatch

  const currentTheme = theme === "system" ? systemTheme : theme;
  const iconMatlab =
    currentTheme === "dark" ? "/matlab-light.png" : "/matlab-dark.png";
  const iconFlowbite =
    currentTheme === "dark" ? "/flowbite-light.png" : "/flowbite-dark.png";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPublishAlert(null);

    if (!isSignedIn) {
      setPublishAlert({ message: "Please login first.", status: "failure" });
      setLoading(false);
      return;
    }
    if (!subject || !message) {
      setPublishAlert({
        message: "Please fill all fields.",
        status: "failure",
      });
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/inbox/create", {
        user: user?.publicMetadata?.userId || "",
        subject: subject || "no subject",
        message: message || "no message",
      });

      setPublishAlert({
        message: "Successfully submitted!",
        status: "success",
      });
      setSuccess(true);
      setSubject("");
      setMessage("");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong.";
      setPublishAlert({ message: message, status: "failure" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-12 lg:py-18">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            About
          </h2>
          <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Full Stack Web Developer | Turning ideas into amazing websites!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 px-3 max-w-6xl mx-auto items-start">
          <div className="text-center mx-auto lg:col-span-5 col-span-12">
            <img
              src="/ProfileBromo.jpeg"
              alt="Flowbite dashboard"
              className="w-full max-w-xs aspect-square rounded-full border-4 border-white object-cover mx-auto"
            />
          </div>
          <div className="lg:col-span-7 col-span-12">
            <h3 className="text-2xl font-bold mb-2">
              Dominicus Agfid Suryaputra
            </h3>
            <a
              href="https://higesan.store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              https://higesan.store ↗
            </a>
            <p className="text-gray-400 mt-4">
              I am a full stack web developer with a passion for creating
              interactive and responsive web applications. I have experience
              working with Laravel, Codeigniter, NextJs, MySQL, HTML, CSS, and
              Git. I am a quick learner and always looking to expand my
              knowledge and skill set. I am a team player and excited to work
              with others to create amazing applications.
            </p>
            <div className="mt-6 flex flex-col lg:flex-row items-center gap-4 lg:justify-start justify-center">
              <a href="/CV-Domi.pdf" download>
                <Button
                  className="flex items-center gap-2 cursor-pointer rounded-xl border border-teal-500 shadow-md hover:shadow-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300"
                  color="blue"
                >
                  Download CV <TbDownload />
                </Button>
              </a>

              <a href="#contact">
                <Button
                  className="flex items-center gap-2 cursor-pointer rounded-xl border border-gray-500 shadow-md hover:shadow-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-300"
                  color="gray"
                >
                  Contact Me <TbMail />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-12 lg:py-8">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Skills
          </h2>
          <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Familiar with various tools for building websites from frontend to
            backend, including deployment.
          </p>

          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                const isSelected = selectedSkill === skill.label;
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center"
                    onClick={() => setSelectedSkill(skill.label)}
                  >
                    <Icon className="text-4xl text-gray-600 hover:text-blue-600 hover:scale-110 transition duration-300 cursor-pointer" />
                    <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {skill.label}
                    </span>
                    {isSelected && (
                      <span className="mt-2 text-sm font-medium text-blue-600">
                        {skill.label}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Tambahan custom skill */}
              {[
                { label: "Matlab", icon: iconMatlab },
                { label: "Flowbite", icon: iconFlowbite },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group relative flex flex-col items-center"
                  onClick={() => setSelectedSkill(item.label)}
                >
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    width={35}
                    height={35}
                    className="cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                  {selectedSkill === item.label && (
                    <span className="mt-2 text-sm font-medium text-blue-600">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-12 lg:py-18">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Contact
          </h2>
          <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Feel free to contact me with any inquiries and questions!
          </p>
        </div>
        {/* Responsive Layout */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6 col-span-12 flex flex-col items-start text-left">
            <div className="flex w-full max-w-md flex-col gap-4">
              <h3 className="text-2xl font-bold mb-4">Let’s Connect</h3>
              <p className="text-gray-400">
                I’m currently looking for new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I’ll
                try my best to get back to you!
              </p>
              {/* Icons */}
              <div className="flex gap-7 mt-6 text-gray-600 text-3xl">
                {[
                  {
                    href: "https://www.instagram.com/dominicus_agfid/",
                    icon: <BsInstagram />,
                    name: "Instagram",
                    hoverColor: "hover:text-pink-500",
                  },
                  {
                    href: "https://x.com/Dominicus_Agfid",
                    icon: <BsTwitterX />,
                    name: "Twitter X",
                    hoverColor: "hover:text-sky-500",
                  },
                  {
                    href: "https://github.com/HigeDev",
                    icon: <BsGithub />,
                    name: "GitHub",
                    hoverColor: "hover:text-gray-900",
                  },
                  {
                    href: "hhttps://www.youtube.com/@Hige_San",
                    icon: <BsYoutube />,
                    name: "YouTube",
                    hoverColor: "hover:text-red-400",
                  },
                ].map(({ href, icon, name, hoverColor }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group cursor-pointer transition-colors duration-200 text-gray-600 ${hoverColor}`}
                  >
                    {icon}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                      {name}
                    </span>
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/6283829863472?text=Hi%20Domi👋"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color="green"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <SiWhatsapp />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div
            id="contact"
            className="lg:col-span-6 col-span-12 flex flex-col items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Contact me</h3>
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-4 px-2"
            >
              {publishAlert && (
                <Alert color={publishAlert.status}>
                  {publishAlert.message}
                </Alert>
              )}
              {inboxCount > 0 && (
                <p className="text-right flex items-center justify-end gap-2">
                  {inboxCount} message submitted <RiHistoryFill />
                </p>
              )}
              <div className="mb-6 text-left w-full">
                <Label htmlFor="subject" className="mb-2 block">
                  Subject
                </Label>
                <TextInput
                  id="subject"
                  name="subject"
                  placeholder="Let me know how i can help you"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-6 text-left w-full">
                <Label htmlFor="message" className="mb-2 block">
                  Your message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="mb-6 w-full">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <a
                  href="mailto:dominicusagfid@gmail.com"
                  className="hover:underline"
                >
                  dominicusagfid@gmail.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
