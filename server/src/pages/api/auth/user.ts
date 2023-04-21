// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbService, jwtAuth, useCryptos, useJwt } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"
import { AuthApi, Collection } from "./auth.type"
import { User } from "@/context"
import { collection, getDoc } from "firebase/firestore"

type Data = AuthApi

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, body } = req
  if (method === "GET") {
    try {
      const { authenticated, accessToken, message, uid } = await jwtAuth(req)
      if (!authenticated) {
        return res.send({ success: false, message })
      }

      const doc = await dbService
        .collection(Collection.USERS)
        .doc(uid)
        .onSnapshot((doc) => ({ ...doc.data() }))

      return res.send({ success: false, payload: doc })
      // return res.send({success: true, payload: {  accessToken, user}})
    } catch (error: any) {
      return res.send({ success: false, message: error.message })
    }
  } else if (method === "POST") {
    dbService.collection(Collection.USERS).onSnapshot(async (snap) => {
      const users = snap.docs.map((doc) => ({ ...doc.data() })) as User[]
      const { email, password: pwd, name } = req.body as { email: string; password: string; name: string }

      const user = users.find((target) => target.email === email)
      if (user) {
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
    })
  }
}
