export interface Attraction {
  id: number;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  openNow: boolean;
  icon: string;
  tag: string;
  tagColor: string;
  tagBg: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-xs tracking-widest">
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

export default function NearbyAttractionsCard({ a }: { a: Attraction }) {
  return (
    <div
      className="
        relative flex flex-col gap-2.5 p-4 cursor-pointer rounded-xl
        bg-secondary shadow-md overflow-clip
        hover:scale-103 transition-transform
        dark:bg-dark-secondary
      "
    >
      {/* Icon + Tag row */}
      <div className="flex justify-between items-start">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: a.tagBg }}
        >
          {a.icon}
        </div>
        <span
          className="text-[10px] font-bold rounded-md px-2 py-0.5 tracking-wide"
          style={{ color: a.tagColor, background: a.tagBg }}
        >
          {a.tag}
        </span>
      </div>

      {/* Name */}
      <p className="font-bold text-lg text-text-2 dark:text-text-4 leading-snug">
        {a.name}
      </p>

      {/* Stars + Rating */}
      <div className="flex items-center gap-1">
        <StarRating rating={a.rating} />
        <span className="text-sm font-medium text-text-3 dark:text-text-3">
          {a.rating}
        </span>
        <span className="text-sm text-text-3 dark:text-text-3">
          ({a.reviews.toLocaleString()})
        </span>
      </div>

      {/* Footer row */}
      <div className="flex justify-between items-center mt-auto text-sm font-medium text-text-3 dark:text-text-3">
        <span>📏 {a.distance}</span>
        <span
          className={`font-bold ${
            a.openNow
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {a.openNow ? "● Open" : "● Closed"}
        </span>
      </div>
    </div>
  );
}