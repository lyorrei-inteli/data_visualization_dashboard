import { Session, getServerSession } from "next-auth";
import { isServerSide } from "./environment";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth";

export const fetchInstance = async (endpoint: string, options?: RequestInit) => {
    let session: Session | null = null;

    if (isServerSide()) {
        session = await getServerSession(authOptions);
    } else {
        session = await getSession();
    }

    const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    const finalURL = `${baseURL}${endpoint}`;

    const mergedOptions: RequestInit = {
        ...options,
        headers: {
            Authorization: session ? `Bearer ${session.accessToken}` : "",
            ...options?.headers,
        },
    };

    const response = await fetch(finalURL, mergedOptions);
    console.log("response:", response)

    if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData:", errorData)
        throw new Error(errorData.message || errorData.detail || "Fetch request failed");
    }

    return response.json();
};
