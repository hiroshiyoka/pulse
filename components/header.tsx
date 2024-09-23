import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <Image
          src="/assets/icons/logo.svg"
          alt="Pulse Logo"
          width={35}
          height={35}
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
