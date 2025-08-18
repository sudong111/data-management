export async function graphqlRequest(query: string, variables: any) {
    const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    return res.json();
}

// 이메일 체크
export async function checkEmail(email: string) {
    const query = `
    query CheckEmail($email: String!) {
      checkEmail(email)
    }
  `;
    return graphqlRequest(query, { email });
}

// 회원가입
export async function signupUser(email: string, password: string) {
    const query = `
    mutation Signup($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        id
        email
      }
    }
  `;
    return graphqlRequest(query, { email, password });
}

// 로그인
export async function loginUser(email: string, password: string) {
    const query = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `;
    return graphqlRequest(query, { email, password });
}
