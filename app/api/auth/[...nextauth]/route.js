import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from '@utils/database';
import User from '@models/user';

const hadler = NextAuth.default({
    providers:[
        GoogleProvider.default({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],

    callbacks: {

        async signIn({profile}) {
            try {
                await connectToDB();
                const userExists = await User.findOne({email: profile.email});
                
                if(!userExists) {
                    await User.create({
                        username: profile.name,
                        email: profile.email,
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
    
        },
    
        
    }
        
    
})

export { hadler as GET, hadler as POST};