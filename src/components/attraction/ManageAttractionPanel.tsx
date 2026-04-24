import Link from "next/link";
import AttractionCard from "./AttractionCard";

export default function ManageAttractionPanel(){
    return (
        <div>
            <Link href="/admin/attraction/new" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-primary">
                Create Attraction
            </Link>
            <div>
                <br></br>
                Page Navigater
            </div>
            <div>
                <AttractionCard>
                </AttractionCard>
                <AttractionCard>
                </AttractionCard>
                <AttractionCard>
                </AttractionCard>
            </div>
        </div>
    );
}