import { BsInstagram, BsGithub, BsTwitterX, BsYoutube } from "react-icons/bs";
export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">
          Want to know more{" "}
          <a href="/about" className="text-blue-600 hover:underline">
            about me
          </a>
          ?
        </h2>

        <p className="text-gray-500 my-2">Find me on my socials!</p>

        <div className="flex gap-7 mt-6 mx-auto text-gray-600 text-3xl">
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
              href: "https://www.youtube.com/@Hige_San",
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
      </div>
      <div className="p-7 flex-1">
        <div className="relative overflow-hidden w-[300px] h-[170px] sm:w-[280px] sm:h-[140px] md:w-[400px] md:h-[200px] lg:w-[500px] lg:h-[280px]">
          <iframe
            src="https://www.youtube.com/embed/zKdWFIMtKzg?si=Z0Htf0ZwwKk_505x"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
