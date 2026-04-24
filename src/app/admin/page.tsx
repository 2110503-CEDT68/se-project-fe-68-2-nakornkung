import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="my-10 px-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Manage hotels, attraction, bookings, and transport services.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        <Link
          className="flex min-h-48 p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold transition hover:-translate-y-1 dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0"
          href="/admin/hotels"
        >
          Add Hotels
        </Link>

        <Link
          className="flex min-h-48 p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold transition hover:-translate-y-1 dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0"
          href="/admin/attraction"
        >
          Manage Attraction
        </Link>

        <Link
          className="flex min-h-48 p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold transition hover:-translate-y-1 dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0"
          href="/booking"
        >
          Manage Bookings
        </Link>

        <Link
          className="flex min-h-48 p-10 flex-col items-center justify-center rounded-xl bg-secondary border-2 border-primary shadow-sm shadow-black text-center text-balance text-lg font-bold transition hover:-translate-y-1 dark:border-none dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary-0"
          href="/admin/transport"
        >
          Manage Transport
        </Link>
      </div>
    </main>
  );
}