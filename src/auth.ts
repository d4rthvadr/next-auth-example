import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
      accessToken: string | unknown;
      user: {
        address: string;
      } & DefaultSession["user"]
  }
}

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [Google],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.accessToken) {
          token.accessToken = account.accessToken;
      }
      return token;
  },
  async session({session, token }) {
      session.accessToken = token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
        }

      }
  }
  }
})

