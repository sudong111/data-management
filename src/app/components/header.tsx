import Link from "next/link";
import { BiHomeHeart } from "react-icons/bi";
import { TbLogin2 } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
export default function Header() {
    return (
        <header className="header">
            <nav className="header-navigator">
                <Link href="/"><BiHomeHeart className="header-icon" /></Link>
                <Link href="/auth/login"><TbLogin2 className="header-icon" /></Link>
                <Link href="/auth/signup"><FaUserPlus className="header-icon"/></Link>
            </nav>
        </header>
    )
}