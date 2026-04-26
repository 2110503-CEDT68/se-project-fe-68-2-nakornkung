import { Attraction } from "@/interface/Attraction";
import Image from "next/image";

type AttractionCardProps = {
  attraction: Attraction;
};

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div
      className="relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:scale-[1.02] cursor-pointer transition-transform dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none"
    >
      {/* Image Container */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image 
          src="" // Replace with attraction.img
          alt={`Attraction Image of ${attraction.name}`}
          sizes="(max-width: 768px) 100vw, 300px"
          fill
          className="object-cover"
        />
      </div>

      {/* View Mode UI */}
      <div className="flex flex-col flex-grow gap-1">
        <p className="font-bold text-lg text-slate-900 dark:text-[#f5f3ff]">
          {attraction.name}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2">
          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">distance : </span>
            {attraction.distance}
          </p>
          <span
            className={`text-sm font-bold ${
              attraction.isOpen
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {attraction.isOpen ? "● Open" : "● Closed"}
          </span>
        </div>
      </div>
    </div>
  );
}