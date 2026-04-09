"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  "/banner.jpg",
  "/banner1.jpg",
  "/banner2.jpg",
];

export default function Banner() {
  const [bannerIdx, setBannerIdx] = useState(0);

  const nextBanner = () => {
    setBannerIdx((idx) => (idx + 1) % banners.length);
  };

  const prevBanner = () => {
    setBannerIdx((idx) => (idx - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextBanner();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [bannerIdx]);

  return (
    <div className="relative w-full h-110 rounded-4xl overflow-clip hover:scale-102 transition-transform select-none">
      <Image
        src={banners[bannerIdx]}
        alt="Banner image"
        fill
      />

      {/* controls */}
      <div
        className="
          flex absolute top-0 right-0 h-full w-20 items-center justify-center
          bg-black/20 opacity-0 hover:opacity-100 transition-opacity
          text-white font-black
        "
        onClick={nextBanner}
      >→</div>
      <div
        className="
          flex absolute top-0 left-0 h-full w-20 items-center justify-center
          bg-black/20 opacity-0 hover:opacity-100 transition-opacity
          text-white font-black
        "
        onClick={prevBanner}
      >←</div>
    </div>
  );
}
