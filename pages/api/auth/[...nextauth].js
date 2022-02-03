import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session:{
    strategy:"jwt"
  } ,
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          client.close();
          throw new Error("Could Not Log U IN");
        }
        client.close();
        return {
          email: user.email,
        };
      },
    }),
    // Passwordless / email sign in
  ],
});
