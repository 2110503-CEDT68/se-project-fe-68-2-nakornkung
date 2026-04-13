import TransportView from "@/components/transport/TransportView";
import { TransportationType } from "@/interface/Transportation";

export default async function TransportationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams;
  const { name = "", provider = "", rawType = "", province = "" } = search;
  const type = rawType as TransportationType;

  return (
    <>
      <TransportView name={name.toString()} provider={provider.toString()} type={type} province={province.toString()}/>
    </>
  );
}
