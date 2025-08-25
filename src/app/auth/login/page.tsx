'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/hooks/auth/useLogin"
import { useAuthStore } from "@/store/auth";
import { emailValidation, passwordValidation } from "@/lib/validation";
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { login } = useLogin();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>(
        {mode: "onSubmit", reValidateMode: "onChange",}
    );
    const router = useRouter();

    const handleLogin = async (data: FormData) => {
        try {
            const result = await login(data.email, data.password);

            if(result) {
                toast.success("로그인 성공");
                useAuthStore.getState().login(result.user, result.token);
                router.push("/");
            }
        } catch (error) {
            toast.error("비밀번호가 일치하지 않거나, 존재하지 않는 유저입니다.");
            reset({ email: "", password: "" });
        }
    };
    
    return (
        <div className="auth-container">
            <Card>
                <CardHeader>
                    <CardTitle>로그인</CardTitle>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleSubmit(handleLogin)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="user@example.com"
                                       className={errors.email ? "border-red-500" : ""}
                                       {...register("email", emailValidation)}
                                />
                                {errors.email && <p className="text-red-500 text-xs">
                                    {errors.email.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password"
                                       className={errors.password ? "border-red-500" : ""}
                                       {...register("password", passwordValidation)}
                                />
                                {errors.password && <p className="text-red-500 text-xs">
                                    {errors.password.message}</p>}
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