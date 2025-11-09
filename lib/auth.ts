import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Estende o tipo User do NextAuth para incluir o id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
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
  secret: process.env.JWT_SECRET,
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
        sameSite: "lax",
        path: "/",
        secure: false, // Para desenvolvimento local
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
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${process.env.API_SECRET}`,
      //   },
      //   body: JSON.stringify({
      //     googleId: user.id,
      //     name: user.name,
      //     email: user.email,
      //     profilePicture: user.image,
      //   }),
      // });

      // if (!res.ok) {
      //   throw new Error("Failed to sign in with Google");
      // }

      // const userData = await res.json();

      user.id = "1337";

      return true;
    },
    jwt({ token, user }) {
      // Quando o usuário faz login, adiciona os dados ao token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      console.log("token from jwt func", token);
      return token;
    },
    session({ session, token, trigger: _ }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        if (token.exp) {
          session.user.id = token.id;
        } else {
          // Remove email from session if token is expired
          // This will log the user out on the client (UserSessionRefresher)
          session.user.email = "";
        }
      }
      session.cc = token.cc;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export async function auth() {
  return await getServerSession(authOptions);
}
