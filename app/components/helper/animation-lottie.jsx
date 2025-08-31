"use client";

import dynamic from "next/dynamic";

// Dynamically import Lottie so it only loads on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimationLottie = ({ animationPath, width = "95%" }) => {
  return (
    <Lottie
      animationData={animationPath}
      loop
      autoplay
      style={{ width }}
    />
  );
};

export default AnimationLottie;
