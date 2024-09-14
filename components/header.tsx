import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
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
