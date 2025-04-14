import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type FC } from "react";
import { MenuIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const NavMenu: FC<{
  paths: { path: string; name: string }[];
}> = ({ paths }) => {
  return (
    <>
      <nav className="space-x-2 hidden md:block">
        {paths.map(({ name, path }) => (
          <Button key={path} variant={"link"}>
            <Link href={path}>{name}</Link>
          </Button>
        ))}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="block size-8 cursor-pointer md:hidden"
        >
          <MenuIcon size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <nav>
            {paths.map(({ name, path }) => (
              <DropdownMenuItem asChild key={path} className="cursor-pointer">
                <Link href={path}>{name}</Link>
              </DropdownMenuItem>
            ))}
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavMenu;
