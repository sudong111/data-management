'use client'
import {useState} from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/hooks/auth/useLogin"
import { useAuthStore } from "@/store/auth";
import { toast } from 'react-toastify';
import {Card, CardContent, CardHeader, CardTitle} from "@/app/components/ui/card"
import {Button} from "@/app/components/ui/button"
import {Label} from "@/app/components/ui/label"
import {Input} from "@/app/components/ui/input"

export default function Login() {
    const { login } = useLogin();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const result = await login(email, password);
        if (!result) {
            toast.error("비밀번호가 일치하지 않거나, 존재하지 않는 유저입니다.");
        } else {
            toast.success("로그인 성공");
            useAuthStore.getState().login(result.user, result.token);
            router.push("/");
        }
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