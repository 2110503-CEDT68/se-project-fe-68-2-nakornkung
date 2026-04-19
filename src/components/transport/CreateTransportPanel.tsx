"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createTransportation from "@/lib/transportation/createTransportation";
import Loading from "@/components/Loading";
import { Transportation, TransportationType } from "@/interface/Transportation";
import capitalize from "@/util/capitalize";
import provinces from "@/data/provinces";

const transportationTypes: TransportationType[] = ["car", "airplane", "boat", "bus", "van", "shuttle"];

const getFriendlyErrorMessage = (message?: string) => {
    if (!message) return "Something went wrong while creating the transportation.";

    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage.includes("duplicate") || normalizedMessage.includes("already exists") || normalizedMessage.includes("e11000")) {
        return "A transportation with this name already exists. Please choose a different name.";
    }

    return message;
};

export default function CreateTransportPanel() {
    const { data: session } = useSession();
    const router = useRouter();

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (transportForm: FormData) => {
        if (!session) return;
        setLoading(true);

        const transportation: Omit<Transportation, "_id" | "createAt"> = {
            name: transportForm.get("name") as string,
            description: transportForm.get("description") as string,
            type: transportForm.get("type") as TransportationType,
            providerName: transportForm.get("providerName") as string,
            pickUpArea: {
                name: transportForm.get("pickUpName") as string,
                address: {
                    street: transportForm.get("pickUpAddress") as string,
                    district: transportForm.get("pickUpDistrict") as string,
                    province: transportForm.get("pickUpProvince") as string,
                    postalCode: transportForm.get("pickUpPostalCode") as string,
                },
            },
            dropOffArea: {
                name: transportForm.get("dropOffName") as string,
                address: {
                    street: transportForm.get("dropOffAddress") as string,
                    district: transportForm.get("dropOffDistrict") as string,
                    province: transportForm.get("dropOffProvince") as string,
                    postalCode: transportForm.get("dropOffPostalCode") as string,
                },
            },
            price: Number(transportForm.get("price")),
            img: transportForm.get("img") as string,
        };

        const res = await createTransportation(transportation, session.user.token);

        if (res.success) {
            alert("Transportation created successfully!");
            router.push("/admin/transport");
            router.refresh();
        } else {
            alert(getFriendlyErrorMessage(res.message));
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
            <div className="col-span-2 flex justify-between items-center gap-4">
                <div className="text-lg font-semibold text-slate-800 dark:text-secondary-gray">New transportation details</div>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition dark:border-dark-secondary-1 dark:text-secondary-gray dark:hover:bg-dark-secondary-0"
                >
                    Back
                </button>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Transportation Name</label>
                <input
                    type="text"
                    name="name"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter transportation name"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Provider Name</label>
                <input
                    type="text"
                    name="providerName"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter provider name"
                    required
                />
            </div>
            <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Description</label>
                <textarea
                    name="description"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter description"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Type</label>
                <select
                    name="type"
                    defaultValue=""
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    required
                >
                    <option value="" disabled>Transportation type</option>
                    {transportationTypes.map((type) => (
                        <option key={type} value={type}>{capitalize(type)}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Price</label>
                <input
                    type="number"
                    name="price"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter price"
                    min={0}
                    required
                />
            </div>

            <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Image URL</label>
                <input
                    type="url"
                    name="img"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="https://example.com/image.jpg"
                    required
                />
            </div>

            <hr className="col-span-2" />

            <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Pick-up location</label>
                <input
                    type="text"
                    name="pickUpName"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter pick-up location"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Address</label>
                <input
                    type="text"
                    name="pickUpAddress"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter pick-up address"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">District</label>
                <input
                    type="text"
                    name="pickUpDistrict"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter pick-up district"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Province</label>
                <select
                    name="pickUpProvince"
                    defaultValue=""
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    required
                >
                    <option value="" disabled>Select pick-up province</option>
                    {provinces.map((province) => (
                        <option key={`pickup-${province}`} value={province}>{province}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Postal Code</label>
                <input
                    type="text"
                    name="pickUpPostalCode"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter pick-up postal code"
                    required
                />
            </div>

            <hr className="col-span-2" />

            <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Drop-off location</label>
                <input
                    type="text"
                    name="dropOffName"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter drop-off location"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Address</label>
                <input
                    type="text"
                    name="dropOffAddress"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter drop-off address"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">District</label>
                <input
                    type="text"
                    name="dropOffDistrict"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter drop-off district"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Province</label>
                <select
                    name="dropOffProvince"
                    defaultValue=""
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    required
                >
                    <option value="" disabled>Select drop-off province</option>
                    {provinces.map((province) => (
                        <option key={`dropoff-${province}`} value={province}>{province}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1 dark:text-secondary-gray">Postal Code</label>
                <input
                    type="text"
                    name="dropOffPostalCode"
                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1"
                    placeholder="Enter drop-off postal code"
                    required
                />
            </div>

            <div className="col-span-2 flex justify-center mt-4 gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-white font-semibold rounded-xl transition dark:bg-dark-primary dark:hover:bg-dark-primary-0 ${
                        isLoading ? "bg-gray-400" : "bg-primary hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Creating..." : "Create Transportation"}
                </button>
            </div>
        </form>
    );
}   