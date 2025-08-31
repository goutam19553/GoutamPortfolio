"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AnimationLottie({ animationData, loop = true }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
}
