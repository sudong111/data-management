'use client';
import { useState } from "react";
import { useSignup } from "@/app/hooks/auth/useSignup";
import { useCheckEmail } from "@/app/hooks/auth/useCheckEmail";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { FaUser } from "react-icons/fa";

export default function Signup() {
    const { signup } = useSignup();
    const { checkEmail } = useCheckEmail();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const handleCheckEmail = async () => {
        if (!email) return;

        const result = await checkEmail(email);
        if (!result) {
            toast.error("이미 사용 중인 이메일입니다");
        } else {
            toast.success("사용 가능한 이메일입니다");
        }
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordCheck) {
            toast.error("비밀번호가 일치하지 않습니다");
            return;
        }

        const result = await signup(email, password);
        if (result) {
            toast.success(`회원가입 완료: ${result.email}`);
            setEmail("");
            setPassword("");
            setPasswordCheck("");
        }
    };

    return (
        <div className="auth-container">
            <Card>
                <CardHeader>
                    <CardTitle>회원 가입</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => handleSignup(e)}>
                        <div className="flex flex-col gap-6">
                            <div className="relative flex w-full justify-center">
                                <Avatar className="w-[5rem] h-[5rem]">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="p-3"><FaUser className="w-full h-full" /></AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">이메일</Label>
                                <div className="flex gap-3">
                                    <Input id="email" type="email" placeholder="user@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="button" onClick={() => handleCheckEmail()}>중복 체크</Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">비밀 번호</Label>
                                </div>
                                <Input id="password" type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password_check">비밀 번호 확인</Label>
                                </div>
                                <Input id="password_check" type="password"
                                       value={passwordCheck}
                                       onChange={(e) => setPasswordCheck(e.target.value)}
                                       required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Signup
                            </Button>
                        </div>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}