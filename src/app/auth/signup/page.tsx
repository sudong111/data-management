'use client';
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useSignup } from "@/app/hooks/auth/useSignup";
import { useCheckEmail } from "@/app/hooks/auth/useCheckEmail";
import { emailValidation, passwordValidation, passwordCheckValidation } from "@/lib/validation";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { FaUser } from "react-icons/fa";


type FormData = {
    email: string;
    password: string;
    password_check: string;
};

export default function Signup() {
    const { signup } = useSignup();
    const { checkEmail } = useCheckEmail();
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const { register, handleSubmit, setError, clearErrors, watch, trigger, formState: { errors } } =
        useForm<FormData>({
            mode: "onSubmit",
            reValidateMode: "onChange",
        });
    const router = useRouter();

    const handleCheckEmail = async () => {
        const valid = await trigger("email");
        if (!valid) return;

        const email = watch("email");

        try {
            const result = await checkEmail(email);

            if(result) {
                setIsEmailChecked(true);
                clearErrors("email");
            }
            else {
                setIsEmailChecked(false);
                setError("email", { message: "이미 사용 중인 이메일입니다." });
            }
        } catch (error) {
            setError("email", { message: "이미 사용 중인 이메일입니다." });
        }
    };

    const handleSignup = async (data: FormData) => {
        try {
            const result = await signup(data.email, data.password);

            if(result) {
                toast.success(`회원가입 완료: ${result.email}`);
                router.push("/");
            }
        } catch (error) {
            toast.error("회원가입에 실패했습니다.");
        }
    };

    return (
        <div className="auth-container">
            <Card>
                <CardHeader>
                    <CardTitle>회원 가입</CardTitle>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleSubmit(handleSignup)}>
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
                                           className={errors.email ? "border-red-500" : ""}
                                           {...register("email", {
                                               ...emailValidation
                                           })}
                                    />
                                    <Button type="button" onClick={() => handleCheckEmail()}>중복 체크</Button>
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">비밀번호</Label>
                                </div>
                                <Input id="password" type="password"
                                       className={errors.password ? "border-red-500" : ""}
                                       {...register("password", passwordValidation)}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password_check">비밀번호 확인</Label>
                                </div>
                                <Input id="password_check" type="password"
                                       className={errors.password_check ? "border-red-500" : ""}
                                       {...register("password_check", passwordCheckValidation(watch))}
                                />
                                {errors.password_check && (
                                    <p className="text-red-500 text-sm">{errors.password_check.message}</p>
                                )}
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