import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="grid my-10 px-10 w-2xl max-w-full gap-4 grid-cols-2">
      <Link className="flex p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0" href="/admin/hotels">
        Add hotel
      </Link>
      <Link className="flex p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0" href="/booking">
        View all bookings
      </Link>
      <Link className="flex p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0" href="/admin/transport">
        View transport providers
      </Link>
    </main>
  );
}
