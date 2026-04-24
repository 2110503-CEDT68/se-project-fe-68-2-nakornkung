import ManageAttractionPanel from "@/components/attraction/ManageAttractionPanel"

export default function ManageAttraction() {
    return (
        <main className="flex flex-col my-8 px-10 w-6xl max-w-full h-full items-center gap-4">
            <div className="text-4xl font-bold mt-2">
                Manage Attraction
            </div>
            <ManageAttractionPanel/>
        </main>
    )
}