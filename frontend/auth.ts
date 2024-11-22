import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // JWTコールバック
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // profile.sub が存在する場合のみ id を設定
        if (profile.sub) {
          token.id = profile.sub;
        }
      }
      return token;
    },
    // セッションコールバック
    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
