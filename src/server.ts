import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

export const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});