import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/components/header";
import AppThemeProvider from "@/app/components/appThemeProvider"
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Loop Station",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en">
        <body>
        <AppThemeProvider>
            <Header/>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </AppThemeProvider>
        </body>
    </html>
)
}
