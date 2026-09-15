import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  link: string;
  text1: string;
  text2: string;
  icon: LucideIcon;
}

export function Button({ link, text1, text2, icon: Icon }: ButtonProps) {
  return (
    <Link to={link} className="flex items-center bg-white max-w-50 h-25 sm:max-w-71 sm:h-30 px-2 md:px-5 gap-2 rounded-2xl transition-all duration-100 ease-out hover:-translate-y-2 hover:shadow-md hover:shadow-blue-600">
      <Icon className="h-7 w-7  md:h-10 md:w-10 shrink-0" />
      <div className="flex flex-col">
        <span className="font-semibold sm:text-[20px]" >{text1}</span>
        <span className="font-light text-[14px] sm:text-[16px] line-clamp-2">{text2}</span>
      </div>
    </Link>
  );
}
