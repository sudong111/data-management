"use client"
import Link from "next/link";
import Theme from "./themeToggle"
import { BiHomeHeart } from "react-icons/bi";
import { TbLogin2 } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import {Button} from "@/app/components/ui/button";
export default function Header() {
    return (
        <header className="header">
            <nav className="header-navigator">
                <Link href="/">
                    <Button variant="ghost"><BiHomeHeart className="header-icon" /></Button>
                </Link>

                <Link href="/auth/login">
                    <Button variant="ghost"><TbLogin2 className="header-icon" /></Button>
                </Link>

                <Link href="/auth/signup">
                    <Button variant="ghost"><FaUserPlus className="header-icon" /></Button>
                </Link>

                <Theme />
            </nav>
        </header>
    )
}