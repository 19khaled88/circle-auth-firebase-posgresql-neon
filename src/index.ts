import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createContext } from "./context.js";
import {typeDefs} from './graphql/schema.js';
import { resolvers } from "./graphql/resolvers.js";
import type { User } from "./generated/prisma/client.js";
import dotenv from 'dotenv'

dotenv.config();

// interface Context{
//     user: User | null;
// }

async function start(){
   
    const schema = buildSubgraphSchema({ 
        typeDefs, 
        resolvers:resolvers as any
        // resolvers:resolvers as ConstructorParameters<typeof buildSubgraphSchema>[0]['resolvers'],
    });
    const server = new ApolloServer({schema});

    const { url} = await startStandaloneServer(server,{
        context:createContext,
        listen:{port: Number(process.env.PORT) || 4001 }
    });

    console.log(`auth-service ready at ${url}`);
}

start().catch((err)=>{
    console.error('Failed to start auth-service', err);
    process.exit(1);
})