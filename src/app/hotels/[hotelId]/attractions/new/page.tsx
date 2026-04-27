import CreateAttractionPanel from "@/components/attraction/CreateAttractionPanel";

export default async function CreateAttractionPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;

  return (
    <main className="flex flex-col my-8 px-10 w-3xl max-w-full h-full items-center gap-4">
      <div className="text-4xl font-bold mt-2">Create Attraction</div>
      <CreateAttractionPanel hotelId={hotelId} />
    </main>
  );
}