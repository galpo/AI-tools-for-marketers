import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      return session
    },
  },
})
