import { useLazyQuery } from "@apollo/client/react";
import { CHECK_EMAIL } from "@/lib/graphql/queries";
import type { CheckEmailQuery, CheckEmailQueryVariables } from "@/lib/graphql/types";

export const useCheckEmail = () => {
    const [checkEmailQuery, { data, loading, error }] = useLazyQuery<
        CheckEmailQuery,
        CheckEmailQueryVariables
    >(CHECK_EMAIL);

    const checkEmail = async (email: string) => {
        await checkEmailQuery({ variables: { email } });
        return data?.checkEmail ?? false;
    };

    return { checkEmail, data, loading, error };
};
