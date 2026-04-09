import HotelsView from "@/components/hotels/HotelsView";

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams;
  const { name = "", province = "" } = search;

  return (
    <>
      <HotelsView name={name.toString()} province={province.toString()}/>
    </>
  );
}
