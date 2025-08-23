import { useMutation } from "@apollo/client/react";
import { LOGIN } from "@/lib/graphql/queries";
import type { LoginMutation, LoginMutationVariables } from "@/lib/graphql/types";

export const useLogin = () => {
    const [loginMutation, { data, loading, error }] = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(LOGIN);

    const login = async (email: string, password: string) => {
        const result = await loginMutation({ variables: { email, password } });
        return result.data?.login;
    };

    return { login, data, loading, error };
};
