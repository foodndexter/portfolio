import type { NextApiRequest, NextApiResponse } from "next"
import { AuthApi, Collection } from "./auth.type"
import { dbService, useCryptos, useJwt } from "@/lib"
import { User } from "@/context"
import { getDocs } from "firebase/firestore"

type Data = AuthApi

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body as { email: string; password: string }

  const userRef = dbService.collection(Collection.USERS).where("email", "==", email)

  const userSnap = await getDocs(userRef)

  const users = userSnap.docs.map((doc) => ({ ...doc.data() })) as User[]

  if (!users || !users?.length) {
    return res.send({ success: false, message: "존재하지 않는 유저입니다." })
  }

  const user = users[0]

  if (!user.password) {
    return res.send({ success: false, message: "비밀번호가 없는 유저입니다." })
  }
  const pwdCheck = await useCryptos.compare(password, user.password)
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
}
