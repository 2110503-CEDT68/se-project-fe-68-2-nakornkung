import ManageAttractionPanel from "@/components/attraction/ManageAttractionPanel";
import getAttractionsByHotel from "@/lib/attraction/getAttractionsByHotel";

export default async function HotelAttractionsPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;

  const res = await getAttractionsByHotel(hotelId);
  const attractions = res.success ? res.data : [];

  return (
    <main className="my-6 w-11/12 max-w-7xl space-y-4">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-[#f5f3ff] mb-8">
        Manage Attractions
      </h1>

      <ManageAttractionPanel items={attractions} hotelId={hotelId} />
    </main>
  );
}