import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { LogoutButton } from "../LogoutButton";

export const Navbar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="fixed w-full flex justify-between items-center p-4 right-0 top-0">
            <p>{session?.user?.email}</p>
            <LogoutButton />
        </div>
    );
};
