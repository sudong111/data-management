import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SECRET = process.env.JWT_SECRET!;

export const resolvers = {
    Query: {
        checkEmail: async (_: any, { email }: { email: string }) => {
            const { data: user, error } = await supabase
                .from("user")
                .select("id")
                .eq("email", email)
                .single();

            if(error) {
                throw new Error(error.message);
            }

            return !user;
        },
    },

    Mutation: {
        login: async (_: any, { email, password }: { email: string; password: string }) => {
            const { data: user, error } = await supabase
                .from("user")
                .select("*")
                .eq("email", email)
                .single();

            if (error || !user) {
                throw new Error("사용자 없음");
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error("비밀번호가 일치하지 않음");
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                SECRET,
                { expiresIn: "1h" }
            );

            return {
                token,
                user: { id: user.id, email: user.email }
            };
        },

        signup: async (_: any, { email, password }: { email: string; password: string }) => {
            const { data: existingUser } = await supabase
                .from("user")
                .select("id")
                .eq("email", email)
                .single();

            if (existingUser) {
                throw new Error("이미 존재하는 이메일");
            }

            const hashed = await bcrypt.hash(password, 10);

            const { data, error } = await supabase
                .from("user")
                .insert({ email, password: hashed })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    },
};
