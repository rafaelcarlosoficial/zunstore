import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ]

      const { pathname } = request.nextUrl
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth

      return true
    },
  },
} satisfies NextAuthConfig
