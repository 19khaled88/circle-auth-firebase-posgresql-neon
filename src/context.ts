import { auth } from './lib/firebaseAdmin.js';


import prisma from './lib/prisma.js'



export async function createContext({req}:{req:any}){
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if(!token) return {user:null};

    try {
        const decoded = await auth.verifyIdToken(token);

        let user = await prisma.user.findUnique({where: {firebaseUid: decoded.uid}});

        if(!user){
            user = await prisma.user.create({
                data:{
                    firebaseUid:decoded.uid,
                    email:decoded.email || '',
                    name:decoded.name || decoded.email?.split('@')[0] || ' New User',
                },
            });
        }

        if(!user.isActive){
            return {user:null};
        }
        return { user };
    } catch (error) {
        console.error('Token verification failed:',error);
        return { user : null };
    }
}