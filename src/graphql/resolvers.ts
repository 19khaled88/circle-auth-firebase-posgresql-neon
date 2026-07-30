import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    async me(_: unknown, __: unknown, { user }: any) {
      if (!user) {
        throw new GraphQLError("Unauthorized");
      }

      return user;
    },

    async user(_: unknown, { id }: any, { prisma }: any) {
      return prisma.user.findUnique({
        where: {
          id,
        },
      });
    },

    async users(
      _: unknown,
      { limit = 10, offset = 0 }: any,
      { prisma }: any
    ) {
      return prisma.user.findMany({
        take: limit,
        skip: offset,
      });
    },
  },

  Mutation: {
    async updateProfile(
      _: unknown,
      args: any,
      { prisma, user }: any
    ) {
      if (!user) {
        throw new GraphQLError("Unauthorized");
      }

      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: args.name ?? undefined,
          bio: args.bio ?? undefined,
          avatarUrl: args.avatarUrl ?? undefined,
        },
      });
    },

    async deactivateUser(
      _: unknown,
      { id }: any,
      { prisma }: any
    ) {
      return prisma.user.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
    },
  },

  User: {
    __resolveReference(reference: any, { prisma }: any) {
      return prisma.user.findUnique({
        where: {
          id: reference.id,
        },
      });
    },
  },
};