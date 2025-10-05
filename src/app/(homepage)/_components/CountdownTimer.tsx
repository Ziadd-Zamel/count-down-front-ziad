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
    <div style={{ direction: "ltr" }} className="py-12 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        {/* center & allow wrapping on small screens */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* Days */}
          <div className="flex flex-col items-center min-w-[88px] sm:min-w-[110px] md:min-w-[140px]">
            {/* big responsive number using clamp: min, preferred (vw), max */}
            <div
              className="text-[#e6c599] font-bold -mt-1"
              style={{ fontSize: "clamp(2.2rem, 8vw, 9.5rem)", lineHeight: 1 }}
            >
              {timeLeft.days}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.9rem, 1.6vw, 2.4rem)" }}
            >
              يوماً
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 6.5rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.8rem)" }}
            >
              ساعة
            </div>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 6.5rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.8rem)" }}
            >
              دقيقة
            </div>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[110px]">
            <div
              className="text-[#e6c599] font-bold"
              style={{
                fontSize: "clamp(1.8rem, 5.6vw, 6.5rem)",
                lineHeight: 1,
              }}
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div
              className="text-[#e6c599] font-medium"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.8rem)" }}
            >
              ثانية
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          {!isStarted && (
            <Button
              className="w-[180px] sm:w-[220px] md:w-[300px] h-[44px] sm:h-[56px] md:h-[64px] text-base sm:text-lg md:text-xl"
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
