import Image from "next/image";
import Logo from "./AboutLogo";
import { ProgressRingLoader } from "react-loadly";
import "react-loadly/styles.css";
import CountdownTimer from "./CountdownTimer";

export default function Heading() {
  return (
    <section className="relative min-h-screen pt-5">
      {/* Background Image */}
      <Image
        src={"/assets/constitutional-court.jpg"}
        alt="background"
        className="absolute inset-0 object-cover"
        fill
        priority
      />

      {/* Content */}
      <div className="relative z-20 gap-16 md:gap-0 flex md:flex-row flex-col-reverse items-start md:items-center justify-between w-full box-container">
        <Logo />
        <p className="text-main text-3xl min-[1800px]:text-5xl self-end">
          https://www.<span className="text-white">alolya</span>.gov.ly
        </p>
      </div>
      <div className="absolute top-[520px] md:top-[400px] lg:top-[240px] min-[1100px]:mt-[150px] min-[1230px]:mt-[0px] min-[1230px]:top-[240px] min-[1230px]:left-[150px] left-1/2 -translate-1/2 min-[1800px]:translate-0 min-[1800px]:mt-10">
        <ProgressRingLoader
          color="#e6c599"
          size={130}
          speed={2.6}
          progress={38}
          thickness={14}
          className="text-white"
        />
        <p className="text-white text-center mt-2">جارٍ رفع البيانات</p>
      </div>
      <div className="flex items-center justify-center box-container mt-[100px] mb-[180px] min-[1230px]:mb-0  ">
        <div className=" text-lg sm:text-2xl min-[1800px]:text-5xl text-center relative z-20 text-white">
          <p>الموقع الإلكتروني للمحكمة العليا بحلة جديدة ومحتوى مزيد</p>
          <p> بإذنة تعالي خلال</p>
        </div>
      </div>
      <div className="box-container relative z-10 mt-10">
        <CountdownTimer />
      </div>
    </section>
  );
}
