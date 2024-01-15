import { getUser } from '@/actions/user'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from './authconfig'

declare module 'next-auth' {
  interface User {
    id: string
    bloodType: string
    userType: string
    status: string
  }
  interface Session {
    user: {
      id: string
      name: string
      email: string
      bloodType: string
      userType: string
      status: string
    }
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email, password)
          return user ?? null
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.bloodType = user.bloodType
        token.userType = user.userType
        token.status = user.status
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      session.user.bloodType = token.bloodType as string
      session.user.userType = token.userType as string
      session.user.status = token.status as string

      return session
    }
  }
})
