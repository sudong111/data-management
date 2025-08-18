'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/app/components/ui/card"
import {Button} from "@/app/components/ui/button"
import {Label} from "@/app/components/ui/label"
import {Input} from "@/app/components/ui/input"
import {useState} from "react";
import {loginUser} from "@/lib/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = await loginUser(email, password);
        setMessage(data.success ? "로그인 완료 ✅" : data.message);
    };
    
    return (
        <div className="auth-container">
            <Card>
                <CardHeader>
                    <CardTitle>로그인</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="user@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}