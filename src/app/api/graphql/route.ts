import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    const { query, variables } = await req.json();

    // Auth
    // 로그인
    if (query.includes("Login")) {
        const { email, password } = variables;

        const { data: user, error } = await supabase
            .from("user")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) return NextResponse.json({ success: false, message: "사용자 없음" });

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return NextResponse.json({ success: false, message: "비밀번호 오류" });

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: "1h" });

        return NextResponse.json({ success: true, token, user: { id: user.id, email: user.email } });
    }

    // 이메일 체크
    if (query.includes("CheckEmail")) {
        const { email } = variables;
        const { data: user, error } = await supabase
            .from("user")
            .select("*")
            .eq("email", email)
            .single();

        if (error && error.code !== "PGRST116") {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: !user, message: user ? "이미 존재하는 이메일" : "사용 가능" });
    }

    // 회원가입
    if (query.includes("Signup")) {
        const { email, password } = variables;

        const { data: user } = await supabase
            .from("user")
            .select("*")
            .eq("email", email)
            .single();

        if (user) return NextResponse.json({ success: false, message: "이미 존재하는 이메일" });

        const hashed = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from("user").insert({ email, password: hashed });

        return NextResponse.json({ success: !error, data });
    }

    return NextResponse.json({ success: false, message: "지원하지 않는 query입니다" }, { status: 400 });
}
