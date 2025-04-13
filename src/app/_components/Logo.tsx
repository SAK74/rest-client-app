import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Logo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={"/"}>
            <Image
              src={"/rest_logo.png"}
              alt="project_logo"
              width={56}
              height={40}
              className="dark:invert-75 h-10"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Logo;
