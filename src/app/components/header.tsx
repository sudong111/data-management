"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/auth";
import Theme from "@/app/components/themeToggle"
import {Button} from "@/app/components/ui/button";
export default function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const handleClickAuthButton = () => {
        if (user) {
            logout();
            router.push("/");
        } else {
            router.push("/auth/login");
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="header">
            <div className="header-container">
                <Button onClick={() => router.push("/")} variant="ghost">Home</Button>
                <div className="flex gap-5">
                    <Button onClick={handleClickAuthButton}>{user ? "Logout" : "Login"}</Button>
                    {!user &&
                    <Button onClick={() => router.push("/auth/signup")} variant="outline">Sign-up</Button>
                    }
                    <Theme />
                </div>
            </div>
        </header>
    )
}