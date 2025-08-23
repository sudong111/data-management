export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }
  
  type AuthPayload {
  token: String!
  user: User!
}

  type Query {
    checkEmail(email: String!): Boolean!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;