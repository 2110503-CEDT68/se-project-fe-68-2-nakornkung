import TransportLocationTooltip from "@/components/transport/TransportLocationTooltip";
import { Transportation } from "@/interface/Transportation";
import capitalize from "@/util/capitalize";
import Image from "next/image";

interface TransportationBookingCardProps {
  transport: Transportation;
  handleBook: (transport: Transportation) => void;
}

export default function TransportationBookingCard({ transport, handleBook }: TransportationBookingCardProps) {
  return (
    <div className="p-2 flex flex-col items-left gap-2 rounded-md border border-gray-400 bg-secondary dark:bg-dark-secondary dark:border-none">
      <div className="relative rounded-sm w-64 aspect-square overflow-clip">
        <Image
          src={transport.img}
          alt={`Image of transport ${transport.name}`}
          sizes="200px"
          fill
        />
      </div>
      <div className="p-2 flex flex-col flex-1 items-left">
        <div>
          {transport.name}
        </div>
        <div> by {transport.providerName}
        </div>
        <div>
          {capitalize(transport.type)}, {transport.price}฿
        </div>
        <div>
          {transport.description}
        </div>
        <div>
          From :<TransportLocationTooltip location={transport.pickUpArea} />
        </div>
        <div>
          To :<TransportLocationTooltip location={transport.dropOffArea} />
        </div>
        <button
          type="button"
          className="px-4 py-1 mt-auto items-center  bg-primary text-white font-semibold rounded-full hover:bg-accent focus:outline-none transition duration-200 dark:bg-dark-primary dark:hover:bg-dark-secondary-0 dark:hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
          onClick={() => handleBook(transport)}
        >
          Book
        </button>
      </div>
    </div>
  );
}
