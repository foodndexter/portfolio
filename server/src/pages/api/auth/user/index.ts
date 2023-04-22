// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API, User } from "@/context"
import { useBcrypt, useJwt } from "@/hooks"
import { dbService } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"
import { Collection } from "./types"

type Data = API

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, headers } = req
  if (method === "GET") {
    const docRef = await dbService.collection(Collection.USERS).doc()
    return res.send({ success: false, message: "Testing" })
  }
  if (method === "POST") {
    dbService.collection(Collection.USERS).onSnapshot(async (snap) => {
      const users = snap.docs.map((doc) => ({ ...doc.data() })) as User[]

      const { email, password, name } = req.body as { email: string; password: string; name: string }
      const user = users.find((target) => target.email === email)
      if (user) {
        return res.send({ success: false, message: "이미 존재하는 유저입니다." })
      }
      const newPassword = await useBcrypt.hash(password)
      const uid = await useBcrypt.getUid()
      const newUser: User = { email, name, uid }

      const { accessToken, refreshToken } = await useJwt.getTokens(newUser)

      try {
        await dbService
          .collection(Collection.USERS)
          .doc(uid)
          .set({ ...newUser, password })
        await dbService.collection(Collection.USERS).doc(uid).collection(Collection.TOKEN).doc("refreshToken").set({ refreshToken })
        return res.send({ success: true, payload: { accessToken, user: newUser } })
      } catch (error: any) {
        return res.send({ success: false, message: error.message })
      }
    })
  }
}
