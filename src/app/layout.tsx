import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/header";

export const metadata: Metadata = {
  title: "Loop Station",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
    <html>
        <body>
        <Header/>
        {children}
        </body>
    </html>
)
}
