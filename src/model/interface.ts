export interface AuthState {
    user: { id: string; email: string } | null;
    token: string | null;
    login: (user: { id: string; email: string }, token: string) => void;
    logout: () => void;
}