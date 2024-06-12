import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({ // local email passworld login method
      async authorize(credentials) {
        
        const { email, password } = credentials;
        const user = await getUser(email as string);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password as string, user.password);

        if (passwordsMatch) return user;
        
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});