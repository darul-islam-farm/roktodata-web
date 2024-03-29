/* eslint-disable no-unused-vars */
import { getAdmin } from '@/actions/admin'
import { getUser } from '@/actions/user'
import { logindata } from '@/constants/schema/register'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { authConfig } from './authconfig'

declare module 'next-auth' {
  interface User {
    id: string
    userId?: string
    role: TRole
    bloodType: string
    status: string
  }
  interface Session {
    user: {
      id: string
      userId: string
      role: TRole
      name: string
      email: string
      bloodType: string
      status: string
    }
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = logindata.safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password, username } = parsedCredentials.data

          if (username === 'admin') {
            const admin = await getAdmin(email, password)
            return admin ?? null
          } else if (username === 'user') {
            const user = await getUser(email, password)
            return user ?? null
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.userId = user.userId
        token.role = user.role
        token.name = user.name
        token.email = user.email
        token.bloodType = user.bloodType
        token.status = user.status
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.userId = token.userId as string
        session.user.role = token.role as TRole
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.bloodType = token.bloodType as string
        session.user.status = token.status as string
      }

      return session
    }
  }
})
