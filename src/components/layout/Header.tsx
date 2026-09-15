import { Link } from "react-router";
import { logoHeader } from "@/assets";

export function Header() {
  return (
    <header className="w-full">
      <div className="max-w-340 mx-auto flex justify-between items-center px-3 py-2.5">
        <Link to="/">
          <img
            src={logoHeader}
            alt="BỆNH VIỆN ĐH Y HÀ NỘI"
            className="h-12 md:h-16"
          />
        </Link>
        <div className="text-xl md:text-2xl">
          <span className="text-gray-500">Hotline: </span>
          <span className="text-rose-500 font-bold">1900 6422</span>
        </div>
      </div>
    </header>
  );
}
