"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "@/components/Banner";
import HotelSearch from "@/components/hotels/HotelSearch";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [province, setProvince] = useState("");

  const handleSearch = () => {
    const search = new URLSearchParams();
    if (name) search.append("name", name);
    if (province) search.append("province", province);
    router.push(`/hotels?${search}`);
  };

  return (
    <main className="flex my-6 px-8 w-6xl max-w-full gap-4 flex-col items-center">
      <Banner />
      <div className="flex gap-2 flex-col items-center">
        <p className="text-lg font-bold">Where do you want to go?</p>
        <HotelSearch name={name} province={province} setName={setName} setProvince={setProvince} onSearch={handleSearch}/>
      </div>
    </main>
  );
}
