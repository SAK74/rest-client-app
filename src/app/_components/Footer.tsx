import Image from "next/image";
import { AUTHORS } from "../_constants/authors";

export default function Footer() {
  return (
    <footer className="text-center h-(--footer-height) flex items-center justify-between px-2 md:px-6 bg-slate-400 dark:bg-slate-800">
      <a href="https://rs.school/courses/reactjs">
        <Image
          src={"/rss-logo.svg"}
          alt="course_logo"
          width={32}
          height={32}
          className="dark:invert"
        />
      </a>
      <div className="grow flex justify-evenly">
        {AUTHORS.map(({ name, ghUrl }) => (
          <a
            key={name}
            href={ghUrl}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Image
              src={"/github.svg"}
              alt="github_logo"
              width={26}
              height={26}
              className="dark:invert hidden sm:block"
            />
            <span className="text-sm">{name}</span>
          </a>
        ))}
      </div>

      <strong>©2025</strong>
    </footer>
  );
}
