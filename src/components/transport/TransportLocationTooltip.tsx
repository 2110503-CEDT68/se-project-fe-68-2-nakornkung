import { Location } from "@/interface/Transportation";

export default function TransportLocationTooltip({ location }: { location: Location }) {
  const { address, name } = location;
  return (
    <span title={`${address.street}, ${address.district}, ${address.province} ${address.postalCode}`} className="underline decoration-dotted underline-offset-2 cursor-help">
      {name}
    </span>
  );
}
