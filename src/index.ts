import "dotenv/config";

import { startStandaloneServer } from "@apollo/server/standalone";

import { server } from "./server.js";
import { createContext } from "./context/context.js";
import { env } from "./config/env.js";

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: env.PORT,
    },
    context: createContext,
  });

  console.log(`🚀 Auth Service running at ${url}`);
}

start();