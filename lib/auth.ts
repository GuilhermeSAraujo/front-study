import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { encode } from "next-auth/jwt";

// Estende o tipo User do NextAuth para incluir o id e token
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    token?: string; // JWT token para enviar no Authorization header
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    picture?: string | null;
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_SECRET}`,
        },
        body: JSON.stringify({
          googleId: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.image,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to sign in with Google");
      }

      const userData = await res.json();

      user.id = userData.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      if (token.email) {
        session.user.email = token.email;
      }

      // Encode the JWT token to send in Authorization header
      if (process.env.NEXTAUTH_SECRET) {
        const encodedToken = await encode({
          token,
          secret: process.env.NEXTAUTH_SECRET,
        });
        session.token = encodedToken;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export async function auth() {
  return await getServerSession(authOptions);
}
