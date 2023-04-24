// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { useBcrypt } from "@/hooks"
import { RandomFriendsApi } from "./types"
import { dbService } from "@/lib"
import { Collection } from "../auth/auth.type"
import { getDocs } from "firebase/firestore"
import { User } from "@/context"

type Data = RandomFriendsApi

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const usersRef = dbService.collection(Collection.USERS)
  const usersSnap = await getDocs(usersRef)
  const friends = usersSnap.docs.map<User>((doc) => {
    const { email, name, profileImage, uid } = doc.data() as User
    const user: User = { email, name, uid, profileImage }
    return user
  })

  return res.send({ success: true, payload: { friends } })
}
