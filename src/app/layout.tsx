import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ApolloWrapper from "@/app/components/apolloWrapper";
import AppThemeProvider from "@/app/components/appThemeProvider"
import Header from "@/app/components/header";

export const metadata: Metadata = {
    title: "Asset Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ApolloWrapper>
            <AppThemeProvider>
                <div className="wrapper">
                    <Header />
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
                </div>
            </AppThemeProvider>
        </ApolloWrapper>
        </body>
        </html>
    );
}
