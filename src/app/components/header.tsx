"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/auth";
import Theme from "@/app/components/themeToggle"
import {BiHomeHeart} from "react-icons/bi";
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
            <nav className="header-navigator">
                <div className="header-container">
                    <Link href="/">
                        <Button variant="ghost"><BiHomeHeart className="header-icon" /></Button>
                    </Link>

                    <Theme />
                </div>
                <div className="absolute right-0 flex gap-5">
                    <Button onClick={handleClickAuthButton}>{user ? "Logout" : "Login"}</Button>
                    {!user &&
                    <Button onClick={() => router.push("/auth/signup")} variant="outline">Sign-up</Button>
                    }
                </div>
            </nav>
        </header>
    )
}