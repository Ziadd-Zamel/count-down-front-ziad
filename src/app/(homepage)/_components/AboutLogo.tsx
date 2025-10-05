import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-5">
      <Image
        className="w-[80px] min-[1800px]:w-[200px]"
        src="/assets/shortLogoY.png"
        alt="شعار ليبرو"
        width={300}
        height={0}
      />
      <Image
        src="/assets/SnalFullLongLogo.png"
        alt="شعار ليبرو"
        width={200}
        height={0}
        className="w-[200px] min-[1800px]:w-[400px]"
      />
    </div>
  );
};

export default Logo;
