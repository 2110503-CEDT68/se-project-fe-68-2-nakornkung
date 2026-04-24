import Image from "next/image";
import Link from "next/link";
import Hotel from "@/interface/Hotel";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="relative w-full h-140 rounded-xl bg-secondary shadow-md overflow-clip hover:scale-103 transition-transform dark:bg-dark-secondary">
      <Link
        className="flex w-full h-full gap-4 flex-col"
        href={`/hotels/${hotel._id}`}
      >
        <div className="relative h-3/5 shrink-0">
          <Image
            src={hotel.img}
            alt={`Image of hotel ${hotel.name}`}
            sizes="20vw"
            fill
          />
        </div>
        <div className="flex px-6 py-2 gap-2 flex-col">
          <h2 className="text-2xl font-bold text-text-2 dark:text-text-4">{hotel.name}</h2>
          <div className=" text-lg font-medium text-text-3 dark:text-text-3">{hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}</div>
          <div className="mt-4 text-lg font-medium text-text-3 dark:text-text-3">{hotel.tel}</div>
        </div>
      </Link>
      <Link className="absolute right-8 bottom-6 px-6 py-2 rounded-2xl bg-primary text-white text-xl font-bold hover:bg-accent 
      dark:bg-dark-primary dark:text-white dark:hover:bg-dark-secondary-0 dark:border dark:border-dark-secondary dark:hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)]" href={`/book?hotel=${hotel._id}`}>Book</Link>
    </div>
  );
}
