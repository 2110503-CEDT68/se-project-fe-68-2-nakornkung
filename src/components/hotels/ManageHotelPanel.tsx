"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import createHotel from "@/lib/hotels/createHotel";
import Loading from "@/components/Loading";
import Hotel from "@/interface/Hotel";

export default function ManageHotelPanel() {
    const { data: session } = useSession();

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (hotelForm: FormData) => {
        if (!session) return;
        setLoading(true);

        const hotel: Omit<Hotel, "_id"> = {
            name: hotelForm.get('hotelName') as string,
            address: hotelForm.get('address') as string,
            tel: hotelForm.get('phoneNumber') as string,
            district: hotelForm.get('district') as string,
            province: hotelForm.get('province') as string,
            postalcode: hotelForm.get('postalcode') as string,
            img: hotelForm.get('img') as string,
        };

        const res = await createHotel(hotel, session.user.token);

        if (res.success) {
            alert("Create Hotel Successfully!");
        } else {
            alert(`Error: ${res.message}`);
        }
        setLoading(false);
    };

    if (!session) {
        return (
            <Loading />
        );
    }

    return (
        <form
            action={handleSubmit}
            className="grid grid-cols-2 gap-4 w-full p-6 border border-slate-300 rounded-3xl bg-white shadow-md dark:bg-dark-secondary dark:border-none"
        >
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Hotel Name</label>
                <input
                    type="text"
                    name="hotelName"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter hotel name"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Address</label>
                <input
                    type="text"
                    name="address"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none 
                    dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter address"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Tel</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none 
                    dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="08X-XXX-XXXX"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">District</label>
                <input
                    type="text"
                    name="district"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter district"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Province</label>
                <input
                    type="text"
                    name="province"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter province"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Postal Code</label>
                <input
                    type="text"
                    name="postalcode"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="10120"
                    required
                />
            </div>
            <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Image URL</label>
                <input
                    type="url"
                    name="img"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="https://example.com/image.jpg"
                    required
                />
            </div>

            <div>
                
            </div>
            <div className="col-span-2 flex justify-center mt-4 gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-white font-semibold rounded-xl transition dark:bg-dark-primary dark:hover:bg-dark-primary-0 ${
                        isLoading ? "bg-gray-400" : "bg-primary hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Creating..." : "Create Hotel"}
                </button>
            </div>
        </form>

    )
}