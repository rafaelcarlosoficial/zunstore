// import CredentialsProvider from 'next-auth/providers/credentials'
// import dbConnect from './dbConnect'
// import UserModel from './models/UserModel'
// import bcrypt from 'bcryptjs'
// import NextAuth from 'next-auth'

// export const config = {
//   //here you can set up to sign up
//   //using google account
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {
//           type: 'email',
//         },
//         password: { type: 'password' },
//       },

//       async authorize(credentials) {
//         await dbConnect()
//         if (credentials == null) return null

//         const user = await UserModel.findOne({ email: credentials.email })

//         if (user) {
//           const isMatch = await bcrypt.compare(
//             credentials.password as string,
//             user.password
//           )
//           if (isMatch) {
//             return user
//           }
//         }
//         return null
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/signin',
//     newUser: '/register',
//     error: 'signin',
//   },
//   callbacks: {
//     authorized({ request, auth }: any) {
//       const protectedPaths = [
//         /\/shipping/,
//         /\/payment/,
//         /\/place-order/,
//         /\/profile/,
//         /\/order\/(.*)/,
//         /\/admin/,
//       ]
//       const { pathname } = request.nextUrl
//       if (protectedPaths.some((p) => p.test(pathname))) return !!auth
//       return true
//     },
//     async jwt({ user, trigger, session, token }: any) {
//       if (user) {
//         token.user = {
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           isAdmin: user.isAdmin,
//         }
//       }
//       if (trigger === 'update' && session) {
//         token.user = {
//           ...token.user,
//           email: session.user.email,
//           name: session.user.name,
//         }
//       }
//       return token
//     },

//     session: async ({ session, token }: any) => {
//       if (token) {
//         session.user = token.user
//       }
//       return session
//     },
//   },
// }

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(config)
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import bcrypt from 'bcryptjs'

export const config = {
  //trustHost and secret were added by me, they weren't in the ofcial code. I added them to fix an issue
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        if (!credentials) return null

        const user = await UserModel.findOne({
          email: credentials.email,
        }).lean()
        if (!user) return null

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isMatch) return null

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
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
    async jwt({ user, trigger, session, token }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
