import { API, User } from "@/context"
import { dbService } from "@/lib"
import { Collection } from "@/pages/api/auth/user/types"
import jwt, { DecodeOptions } from "jsonwebtoken"
import { NextApiRequest } from "next"

const secret = process.env.JWT_SECRET_KEY as string

interface VerifyToken extends API {
  payload?: { uid: string }
}
export default {
  getTokens: async (user: User, expiresIn?: any): Promise<{ accessToken: string; refreshToken: string }> => {
    const accessToken = await jwt.sign({ uid: user.uid }, secret, { expiresIn: expiresIn ?? "12h" })
    const refreshToken = await jwt.sign({}, secret, { expiresIn: "28d" })
    return { accessToken, refreshToken }
  },

  getAccessToken: async (user: User, expiresIn?: any): Promise<{ accessToken: string }> => {
    const accessToken = await jwt.sign({ uid: user.uid }, secret, { expiresIn: expiresIn ?? "12h" })

    return {
      accessToken,
    }
  },

  getRefreshToken: async (): Promise<{ refreshToken: string }> => {
    const refreshToken = await jwt.sign({}, secret, { expiresIn: "28d" })
    return { refreshToken }
  },

  verifyToken: async (token: string): Promise<API> => {
    try {
      await jwt.verify(token, secret)
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  },

  decodeToken: async (token: string): Promise<VerifyToken> => {
    try {
      const decoded = await jwt.decode(token)
      const { uid } = decoded as { uid: string }
      return {
        success: true,
        payload: { uid },
      }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  },

  //  useJwtAuth: async (req: NextApiRequest): Promise<API> => {
  //   const { authorization } = req.headers
  //   if (!authorization) {
  //     return { success: false }
  //   }
  //   const accessToken = authorization.split("Bearer ")[1]
  //   if (!accessToken) {
  //     return { success: false }
  //   }
  //   const { success, message } = await verifyToken(accessToken)
  //   if (!success) {
  //     if (message?.includes("expired")) {
  //       const { success, payload, message } = await decodeToken(accessToken)
  //       if (!success || !payload) {
  //         return {
  //           success,
  //           message,
  //         }
  //       }
  //       const { uid } = payload
  //       const result = await dbService.collection(Collection.USERS).doc(uid).collection(Collection.TOKEN).get()
  //       console.log
  //     }
  //   }
  //   return { success }
  // }
}
