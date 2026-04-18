
import ManageHotelPanel from "@/components/hotels/ManageHotelPanel";

export default function ManageHotel() {
    return (
        <main className="flex flex-col my-8 px-10 w-3xl max-w-full h-full items-center gap-4">
            <div className="text-4xl font-bold mt-2">
                Add Hotel
            </div>
            <ManageHotelPanel/>
        </main>
    )
}