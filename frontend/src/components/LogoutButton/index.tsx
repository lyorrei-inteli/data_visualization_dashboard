"use client";
import { routes } from "@/config/routes";
import { signOut } from "next-auth/react";
import React from "react";

export const LogoutButton = () => {
    return (
        <button
            className="bg-primary transition-all hover:scale-105  text-white font-bold py-2 px-4 rounded"
            onClick={() =>
                signOut({
                    redirect: true,
                    callbackUrl: routes.auth.login,
                })
            }
        >
            Logout
        </button>
    );
};
