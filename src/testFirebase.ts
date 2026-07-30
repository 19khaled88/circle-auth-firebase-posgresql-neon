import "dotenv/config";
import { auth } from "./cnofig/firebaseAdmin.js";

async function test() {
  console.log(auth.app.name);
}

test();