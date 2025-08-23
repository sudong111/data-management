import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "@/lib/graphql/queries";
import type { SignupMutation, SignupMutationVariables } from "@/lib/graphql/types";

export const useSignup = () => {
    const [signupMutation, { data, loading, error }] = useMutation<
        SignupMutation,
        SignupMutationVariables
    >(SIGNUP);

    const signup = async (email: string, password: string) => {
        const result = await signupMutation({ variables: { email, password } });
        return result.data?.signup;
    };

    return { signup, data, loading, error };
};
