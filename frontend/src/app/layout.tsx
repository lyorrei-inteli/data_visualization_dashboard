import { SessionContextProvider } from "@/contexts/Session";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Todo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <SessionContextProvider>
                    {children}
                    <ToastContainer position="top-center" />
                </SessionContextProvider>
            </body>
        </html>
    );
}
