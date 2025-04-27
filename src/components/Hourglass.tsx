import { HourglassIcon } from "lucide-react";

export default function Hourglass() {
  return (
    <div
      role="status"
      className="fixed w-full h-full inset-0 flex items-center justify-center z-10 bg-transparent backdrop-brightness-75"
    >
      <HourglassIcon className="animate-hourglass fill-foreground/50" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
