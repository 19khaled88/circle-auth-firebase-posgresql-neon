import "dotenv/config";
import { auth } from "./config/firebaseAdmin.js";

async function test() {
  console.log(auth.app.name);
}

test();