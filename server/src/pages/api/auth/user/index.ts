// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbService, jwtAuth, useCryptos, useJwt } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"
import { AuthApi, Collection } from "../auth.type"
import { User } from "@/context"
import { collection, getDoc, getDocs, Query, DocumentData } from "firebase/firestore"

type Data = AuthApi

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, body } = req

  if (method === "GET") {
    try {
      const result = await jwtAuth(req)
      const { authenticated, accessToken, message, uid } = result
      if (!authenticated) {
        return res.send({ success: false, message })
      }

      if (!uid) {
        return res.send({ success: false, message: "uid 가 존재하지 않습니다." })
      }

      const userRef = dbService.collection(Collection.USERS).doc(uid)
      const userSnap = await getDoc(userRef)
      const { email, name, profileImage } = userSnap.data() as User

      const user = { email, name, uid, profileImage }
      return res.send({ success: true, payload: { accessToken, user } })
    } catch (error: any) {
      return res.send({ success: false, message: error.message })
    }
  } else if (method === "POST") {
    const { email, password: pwd, name } = req.body as { email: string; password: string; name: string }

    const userRef = dbService.collection(Collection.USERS).where("email", "==", email)
    const userSnap = await getDocs(userRef)

    const users = userSnap.docs.map((doc) => ({ ...doc.data() }))

    if (users.length > 0) {
      return res.send({ success: false, message: "중복된 이메일 입니다." })
    }

    const password = await useCryptos.hash(pwd)
    const uid = await useCryptos.getUid()

    const newUser: User = { email, uid, name }
    const docRef = dbService.collection(Collection.USERS).doc(uid)

    const { accessToken, refreshToken } = await useJwt.getTokens({ uid })
    try {
      await docRef.set({ ...newUser, password })
      try {
        await dbService.collection(Collection.TOKEN).doc(uid).set({ refreshToken })
        return res.send({ success: true, payload: { accessToken, user: newUser } })
      } catch (error) {
        console.log(error)
        return res.send({ success: false, message: "리프레쉬 토큰 넣는데 실패!" })
      }
    } catch (error) {
      console.log(error)
      return res.send({ success: false, message: "유저 등록이 실패!" })
    }
  }
}
