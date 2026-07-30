import prisma from "../cnofig/prisma.js";
import { auth } from "../cnofig/firebaseAdmin.js";

export interface Context {
  prisma: typeof prisma;
  user: any;
}

export async function createContext({ req }: any): Promise<Context> {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return {
      prisma,
      user: null,
    };
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = await auth.verifyIdToken(token);

    let user = await prisma.user.findUnique({
      where: {
        firebaseUid: decoded.uid,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email: decoded.email!,
          name: decoded.name ?? "",
          avatarUrl: decoded.picture,
        },
      });
    }

    return {
      prisma,
      user,
    };
  } catch (error) {
    console.error(error);

    return {
      prisma,
      user: null,
    };
  }
}