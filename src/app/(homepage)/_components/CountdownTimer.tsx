"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
interface CountdownTimerProps {
  onCountdownChange?: (isActive: boolean) => void;
}
export default function CountdownTimer({
  onCountdownChange,
}: CountdownTimerProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 90,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Notify parent component when countdown state changes
  useEffect(() => {
    if (onCountdownChange) {
      onCountdownChange(isStarted);
    }
  }, [isStarted, onCountdownChange]);

  // On mount, check if countdown was started previously and resume from localStorage
  useEffect(() => {
    try {
      const storedEnd = localStorage.getItem("countdownEnd");
      if (storedEnd) {
        const endTimeMs = Number(storedEnd);
        const now = Date.now();
        if (!Number.isNaN(endTimeMs) && endTimeMs > now) {
          setIsStarted(true);
          const diff = endTimeMs - now;
          const totalSeconds = Math.floor(diff / 1000);
          const days = Math.floor(totalSeconds / (24 * 3600));
          const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          // Expired, clear persisted end time
          localStorage.removeItem("countdownEnd");
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      try {
        const storedEnd = localStorage.getItem("countdownEnd");
        if (!storedEnd) {
          // Safety: if missing, stop the countdown
          setIsStarted(false);
          clearInterval(timer);
          return;
        }
        const endTimeMs = Number(storedEnd);
        const now = Date.now();
        const diff = Math.max(0, endTimeMs - now);
        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds });

        if (diff <= 0) {
          clearInterval(timer);
          localStorage.removeItem("countdownEnd");
          setIsStarted(false);
        }
      } catch {
        // If any error occurs, stop gracefully
        clearInterval(timer);
        setIsStarted(false);
      }
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
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] md:min-w-[200px] min-[1800px]:min-w-[180px] min-[2000px]:min-w-[220px]">
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
              className=" text-black px-7 py-3 min-[1700px]:py-5 text-base sm:text-lg md:text-xl min-[1800px]:!text-2xl min-[2000px]:!text-6xl"
              onClick={() => {
                const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
                const endTimeMs = Date.now() + ninetyDaysMs;
                try {
                  localStorage.setItem("countdownEnd", String(endTimeMs));
                } catch {
                  // ignore storage errors
                }
                setIsStarted(true);
              }}
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
