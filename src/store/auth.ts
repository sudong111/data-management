import { create } from "zustand";
import {AuthState} from "@/model/interface"

const getInitialAuth = () => {
    if (typeof window !== "undefined") {
        const storedUser = sessionStorage.getItem("authUser");
        const storedToken = sessionStorage.getItem("authToken");
        return {
            user: storedUser ? JSON.parse(storedUser) : null,
            token: storedToken || null,
        };
    }
    return { user: null, token: null };
};

export const useAuthStore = create<AuthState>((set) => ({
    ...getInitialAuth(),
    login: (user, token) => {
        set({ user, token });
        if (typeof window !== "undefined") {
            sessionStorage.setItem("authUser", JSON.stringify(user));
            sessionStorage.setItem("authToken", token);
        }
    },
    logout: () => {
        set({ user: null, token: null });
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("authUser");
            sessionStorage.removeItem("authToken");
        }
    },
}));
