// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/app/lib/ConnectToDb";
import User from "@/app/models/userSchema";
import bcrypt from "bcryptjs";

// Connect to the database
connectToDatabase();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Please enter both email and password");
          }
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Incorrect email or password");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Incorrect email or password");
          }

          return user;
        } catch (error) {
          throw new Error("Internal server error");
          console.log("error is coming during authntication..",error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      const username=user.name
      const email=user.email
      const existingUser = await User.findOne({ email: email});
      if (!existingUser) {
        const newUser = new User({
          name: username,
          email: email,
        });
        await newUser.save();
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      if (account?.provider === "linkedin") {
        token.linkedinProfile = profile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { authOptions }; 
export { handler as GET, handler as POST };
