import prisma from "../lib/prisma.js";

import type { User } from "../generated/prisma/client.js";
import type { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper/resolverMap.js";

interface Context{
    user: {id:string; role:string} | null;
}

export const resolvers:GraphQLResolverMap<Context> = {
    Query:{
        me:async(_parent, __args, context)=>{
            if(!context.user) throw new Error('Unauthorized');
            return prisma.user.findUnique({where:{id:context.user.id}});
        },

        user:async(_parent, {id}:{id:string})=>{
            return prisma.user.findUnique({where:{id}});
        },

        users:async(_parent, args:{limit?: number; offset?:number}, context)=>{
            if(!context.user || context.user.role !== 'ADMIN') {
                throw new Error('Forbidden admin access required');
            }
            return prisma.user.findMany({
                take:args.limit ?? 50,
                skip:args.offset ?? 0,
                orderBy:{createdAt: 'desc'},
            });
        },
    },

    Mutation: {
        updateProfile:async(
            _parent,
            args:{name?:string; bio?:string; avatarUrl?:string},
            context 
        )=>{
            if(!context.user) throw new Error('Unauthorized');
            return prisma.user.update({
                where:{id:context.user.id},
                data:args,
            });
        },

        deactivateUser:async(
            _parent,
            {id}:{id:string},
            context
        )=>{
            if(!context.user || context.user.role !== 'ADMIN') {
                throw new Error('Forbidden: admin access required');
            }

            return prisma.user.update({
                where:{id},
                data:{isActive:false},
            });
        },
    },
    // Lets other federated services ( )
    User:{
        __resolveReference:async(reference:{id:string})=>{
            return prisma.user.findUnique({where:{id:reference.id}});
        },
        createdAt: (parent: any) => parent.createdAt.toISOString(),
    },
};
