"use client";
import { BarChart, LogOut, PersonStandingIcon, Upload, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { routes } from "@/config/routes";

interface Props {}

const Sidebar: React.FC<Props> = (props) => {
    const location = usePathname();
    const items = [
        {
            icon: BarChart,
            label: "Análise",
            link: routes.predictions.base,
        },
        {
            icon: Upload,
            label: "Upload",
            link: routes.predictions.create,
        },
    ];
    const session = useSession();

    return (
        <div className="w-[20vw] min-h-[100vh] flex flex-col py-8 border-r-2 border-[#E4E4E4] fixed">
            <Image alt="Logo" src={Logo} className="mx-auto mb-8" width={200} />

            <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                    <Link
                        className={`flex pl-6 py-5 mr-10 rounded-r-xl gap-4 text-xl items-center text-[#A3A3A5] ${
                            location == item.link && "bg-primary !text-white"
                        }`}
                        key={item.link}
                        href={item.link}
                    >
                        <item.icon /> <p>{item.label}</p>{" "}
                    </Link>
                ))}
            </div>

            <div className="mt-auto flex gap-4 justify-center items-center text-lg">
                <UserIcon />
                <p>{session.data?.user?.name}</p>
            </div>
            <div className="w-full bg-[#E4E4E4] h-[2px] mt-4"></div>
            <button
                className="mt-4 text-center text-lg flex items-center justify-center w-full gap-4 hover:scale-105 transition-all"
                onClick={() => {
                    signOut();
                }}
            >
                <LogOut /> Logout
            </button>
        </div>
    );
};

export default Sidebar;
