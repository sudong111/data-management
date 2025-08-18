import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/app/components/ui/card";
import {Label} from "@/app/components/ui/label";
import {Input} from "@/app/components/ui/input";
import {Button} from "@/app/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/components/ui/avatar";
import { FaUser } from "react-icons/fa";

export default function Signup() {
    return (
        <div className="auth-container">
            <Card>
                <CardHeader>
                    <CardTitle>회원 가입</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="relative flex w-full justify-center">
                                <Avatar className="w-[5rem] h-[5rem]">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="p-3"><FaUser className="w-full h-full" /></AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password_check">Password Check</Label>
                                </div>
                                <Input id="password_check" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}