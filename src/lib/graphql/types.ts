export interface LoginMutation {
    login: {
        token: string;
        user: {
            id: string;
            email: string;
        };
    };
}

export interface LoginMutationVariables {
    email: string;
    password: string;
}

export interface SignupMutation {
    signup: {
        id: string;
        email: string;
    };
}

export interface SignupMutationVariables {
    email: string;
    password: string;
}

export interface CheckEmailQuery {
    checkEmail: boolean;
}

export interface CheckEmailQueryVariables {
    email: string;
}