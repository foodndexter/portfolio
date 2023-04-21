// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { AuthApi, Collection } from "./auth.type"
import { dbService, useCryptos, useJwt } from "@/lib"
import { User } from "@/context"

type Data = AuthApi

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  dbService.collection(Collection.USERS).onSnapshot(async (snap) => {
    const users = snap.docs.map((doc) => ({ ...doc.data() })) as User[]

    const { email, password } = req.body as { email: string; password: string }
    const user = users.find((target) => target.email === email)
    if (!user) {
      return res.send({ success: false, message: "존재하지 않는 유저입니다." })
    }
    const pwdCheck = await useCryptos.compare(password, user.password!)
    if (!pwdCheck) {
      return res.send({ success: false, message: "비밀번호가 일치하지 않습니다." })
    }

    const { accessToken, refreshToken } = await useJwt.getTokens(user)
    const docRef = dbService.collection(Collection.TOKEN).doc(user.uid)
    try {
      await docRef.update({ refreshToken })
    } catch (error) {
      return res.send({ success: false, message: "리프레쉬 토큰 저장에 실패했습니다." })
    } finally {
      return res.send({ success: true, payload: { accessToken, user: { email: user.email, uid: user.uid, profileImage: user.profileImage, name: user.name } } })
    }
  })
}
