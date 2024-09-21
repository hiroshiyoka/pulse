import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        width={32}
        height={32}
        alt="loader"
        className="animate-spin"
        src="/assets/icons/loader.svg"
      />
      Loading...
    </div>
  );
};

export default Loader;
