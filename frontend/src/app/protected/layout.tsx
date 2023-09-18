import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Variants, motion } from "framer-motion";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-[100vh]">
            <Sidebar />
            <div  className="flex absolute left-[20vw] w-[80vw] min-h-[100vh]">
                <div className="p-12 px-8 grow flex flex-col">{children}</div>
            </div>
        </div>
    );
}
