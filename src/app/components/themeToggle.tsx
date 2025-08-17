"use client"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { BsMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') setTheme('dark')
    }, [])

    useEffect(() => {
        const html = document.documentElement
        if (theme === 'dark') html.classList.add('dark')
        else html.classList.remove('dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    return <Button variant="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <BsMoonStarsFill className="header-icon"/> : <BsSunFill className="header-icon"/>}
    </Button>
}