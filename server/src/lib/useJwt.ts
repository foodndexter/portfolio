import { User } from "@/context"
import { API, Collection } from "@/pages/api/auth/auth.type"
import jwt from "jsonwebtoken"
import { NextApiRequest } from "next"
import { dbService } from "./firebase"
import { getDoc } from "firebase/firestore"

const secretKey = process.env.JWT_SECRET_KEY as string

interface DecodeToken extends API {
  payload?: { uid: string }
}

export const useJwt = {
  getTokens: (user: User | { uid: string }): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.sign({ uid: user.uid }, secretKey, { expiresIn: "12h" })

    const refreshToken = jwt.sign({}, secretKey, { expiresIn: "28d" })

    return { accessToken, refreshToken }
  },
  getAccessToken: (user: User | { uid: string }): { accessToken: string } => {
    const accessToken = jwt.sign({ uid: user.uid }, secretKey, { expiresIn: "12h" })
    return {
      accessToken,
    }
  },
  getRefreshToken: (): string => {
    return jwt.sign({}, secretKey, { expiresIn: "28d" })
  },
  verifyToken: async (token: string): Promise<API> => {
    try {
      await jwt.verify(token, secretKey)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      }
    }
  },
  decodeToken: async (token: string): Promise<DecodeToken> => {
    try {
      const decoded = (await jwt.decode(token)) as { uid: string }
      return {
        success: true,
        payload: { uid: decoded.uid },
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      }
    }
  },
}

interface JWTAUTH {
  authenticated: boolean
  message?: string
  uid?: string
  accessToken?: string
}
export const jwtAuth = async (req: NextApiRequest): Promise<JWTAUTH> => {
  const { authorization } = req.headers
  if (!authorization) {
    return {
      authenticated: false,
      message: "헤더값이 없습니다.",
    }
  }
  const accessToken = authorization.split("Bearer ")[1]
  if (!accessToken) {
    return {
      authenticated: false,
      message: "토큰이 없습니다.",
    }
  }

  try {
    await useJwt.verifyToken(accessToken)
    const { payload } = await useJwt.decodeToken(accessToken)
    return {
      authenticated: true,
      uid: payload?.uid,
    }
  } catch (first: any) {
    if (first.message === "jwt expired" || first.message.include("expire")) {
      try {
        const { payload } = await useJwt.decodeToken(accessToken)
        const uid = payload?.uid as string
        const refreshRef = dbService.collection(Collection.TOKEN).doc(uid)
        const refreshSnap = await getDoc(refreshRef)
        const { refreshToken } = refreshSnap.data() as { refreshToken: string }

        try {
          await useJwt.verifyToken(refreshToken)
          const { accessToken } = useJwt.getAccessToken({ uid })
          return {
            authenticated: true,
            uid,
            accessToken,
          }
        } catch (last: any) {
          return {
            authenticated: false,
            message: "리프레쉬 토큰이 만료되었습니다. 다시 로그인 해주세요.",
          }
        }
      } catch (second: any) {
        return {
          authenticated: false,
          message: "엑세스 토큰에 문제가 있습니다. / 리프레쉬 토큰이 없습니다.",
        }
      }
    }
    return { authenticated: false }
  }
}
