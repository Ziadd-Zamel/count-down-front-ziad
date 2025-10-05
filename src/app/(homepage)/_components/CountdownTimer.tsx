"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 90,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted]);

  return (
    <div
      style={{ direction: "ltr" }}
      className="py-12 px-6 relative z-20 min-[1800px]:py-20 min-[2000px]:py-24"
    >
      <div className="max-w-5xl mx-auto min-[1800px]:max-w-7xl min-[2000px]:max-w-[100rem]">
        {/* center & allow wrapping on small screens */}
        <div className="flex flex-wrap items-center justify-center gap-6 min-[1800px]:gap-12 min-[2000px]:gap-16">
          {/* Days */}
          <div className="flex flex-col items-center min-w-[88px] sm:min-w-[110px] md:min-w-[140px] min-[1800px]:min-w-[220px] min-[2000px]:min-w-[280px]">
            {/* big responsive number using clamp: min, preferred (vw), max */}
            <div
              className="text-[#e6c599] font-bold -mt-1"
              style={{ fontSize: "clamp(2.2rem, 8vw, 14rem)", lineHeight: 1 }}
            >
              {timeLeft.days}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.9rem, 1.6vw, 3.5rem)" }}
            >
              يوماً
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px] min-[1800px]:min-w-[180px] min-[2000px]:min-w-[220px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 10rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 2.8rem)" }}
            >
              ساعة
            </div>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px] min-[1800px]:min-w-[180px] min-[2000px]:min-w-[220px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 10rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 2.8rem)" }}
            >
              دقيقة
            </div>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px] min-[1800px]:min-w-[180px] min-[2000px]:min-w-[220px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 10rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 2.8rem)" }}
            >
              ثانية
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6 min-[1800px]:mt-12 min-[2000px]:mt-16">
          {!isStarted && (
            <Button
              className="w-[180px] sm:w-[220px] md:w-[300px] min-[1800px]:w-[400px] min-[2000px]:w-[500px] h-[44px] sm:h-[56px] md:h-[64px] min-[1800px]:!h-[80px] min-[2000px]:!h-[96px] text-base sm:text-lg md:text-xl min-[1800px]:!text-3xl min-[2000px]:!text-4xl"
              onClick={() => setIsStarted(true)}
              disabled={isStarted}
            >
              {isStarted ? "جاري العد التنازلي..." : "الإذن برفع البيانات"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
