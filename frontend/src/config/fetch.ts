import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { isServerSide } from "./environment";
import { getSession } from "next-auth/react";

export const fetchInstance = async (endpoint: string, options?: RequestInit) => {
    let baseURL: string | null = null;
    let session: Session | null = null;

    if (isServerSide()) {
        session = await getServerSession(authOptions);
        baseURL =
            process.env.NEXT_PUBLIC_NODE_ENV == "development"
                ? (process.env.NEXT_PUBLIC_API_URL as string)
                : "http://backend:3001";
    } else {
        session = await getSession();
        baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    }

    const finalURL = `${baseURL}${endpoint}`;

    const mergedOptions: RequestInit = {
        ...options,
        headers: {
            Authorization: session ? `Bearer ${session.accessToken}` : "",
            ...options?.headers,
        },
    };

    const response = await fetch(finalURL, mergedOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fetch request failed");
    }

    return response.json();
};
