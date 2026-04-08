"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: (value: boolean) => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Start exit animation after 2s
    const exitTimer = setTimeout(() => {
      setExit(true);
    }, 2000);

    // Unmount after animation finishes
    const completeTimer = setTimeout(() => {
      onComplete(true);
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="global-loader"
      className={`fixed inset-0 z-9999 bg-white flex flex-col items-center justify-center ${
        exit ? "exit" : ""
      }`}
    >
      {/* Minimalist Container */}
      <div className="relative flex flex-col items-center justify-center">

        {/* Small Elegant Bus Icon */}
        <div className="relative mb-10 animate-bus-bounce">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            className="w-20 sm:w-25 md:w-30 h-auto"
          >
            <ellipse cx="60" cy="72" rx="45" ry="4" fill="rgba(0,0,0,0.06)" />

            <rect x="8" y="12" width="104" height="42" rx="6" fill="#6BAF92" />
            <rect x="8" y="12" width="104" height="12" rx="6" fill="#8DC9AE" />
            <rect x="8" y="22" width="104" height="2" fill="#6BAF92" />

            <rect x="16" y="18" width="14" height="10" rx="2" fill="#D4EFEA" />
            <rect x="34" y="18" width="14" height="10" rx="2" fill="#D4EFEA" />
            <rect x="52" y="18" width="14" height="10" rx="2" fill="#E8F5F2" />
            <rect x="70" y="18" width="14" height="10" rx="2" fill="#D4EFEA" />

            <rect x="88" y="16" width="14" height="22" rx="2" fill="#528D72" />

            <g transform="translate(32,52)">
              <circle r="10" fill="#1F2937" />
            </g>

            <g transform="translate(88,52)">
              <circle r="10" fill="#1F2937" />
            </g>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes busBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes wheelSpin {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loaderWipe {
          0% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            opacity: 1;
          }

          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
            opacity: 0;
          }
        }

        .animate-bus-bounce {
          animation: busBounce 1.2s ease-in-out infinite;
        }

        .animate-wheel-spin {
          animation: wheelSpin 0.6s linear infinite;
        }

        .exit {
          animation: loaderWipe 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}