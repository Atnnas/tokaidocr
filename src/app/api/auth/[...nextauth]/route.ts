import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-client-secret',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();
          const { name, email, image } = user;
          
          if (!email) {
            return false;
          }
          
          // Look up user in the Users collection
          const existingUser = await User.findOne({ email });
          
          if (!existingUser) {
            // Check if database is empty to allow first user bootstrap as admin
            const userCount = await User.countDocuments();
            if (userCount === 0) {
              await User.create({
                name: name || email.split('@')[0],
                email,
                image: image || '',
                role: 'admin',
              });
              return true;
            }
            
            // If database is not empty, deny entry to unauthorized/uninvited users
            console.warn(`Bloqueo de inicio de sesión/registro para correo no pre-registrado: ${email}`);
            return false;
          } else {
            // Update existing user information if changed
            let isModified = false;
            if (name && existingUser.name !== name) {
              existingUser.name = name;
              isModified = true;
            }
            if (image && existingUser.image !== image) {
              existingUser.image = image;
              isModified = true;
            }
            if (isModified) {
              await existingUser.save();
            }
          }
          return true;
        } catch (error) {
          console.error('Error synchronization with MongoDB in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      if (session?.user?.email) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.role = dbUser.role;
            session.user.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error('Error fetching db user info in session callback:', error);
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

// NextAuth types augmentation for TypeScript safety
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
