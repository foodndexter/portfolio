import { API, User } from "@/context"
import { dbService, jwtAuth } from "@/lib"
import { NextApiRequest, NextApiResponse } from "next"
import { Collection } from "../auth/auth.type"
import { getDocs } from "firebase/firestore"
import { FriendsListApi } from "./types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<FriendsListApi>) {
  const { method } = req
  const { authenticated, uid, accessToken, message } = await jwtAuth(req)

  if (!authenticated || !uid) {
    return res.send({ success: false, message })
  }

  const docRef = dbService.collection(Collection.USERS).doc(uid).collection(Collection.FRIENDSLIST)

  if (method === "GET") {
    const docSnap = await getDocs(docRef)
    const friendslist = docSnap.docs.map((doc) => ({ ...doc.data() })) as User[]
    return res.send({ success: true, payload: friendslist })
  } else {
    const friend = req.body as User
    if (method === "POST") {
      const userSnap = await getDocs(docRef.where("email", "==", friend.email))
      const users = userSnap.docs.map((doc) => ({ ...doc.data() })) as User[]
      if (users && users.length > 0) {
        return res.send({ success: false, payload: users, message: "with users" })
      }
      try {
        await docRef.add(friend)
        return res.send({ success: true, payload: { friendslist: [friend] } })
      } catch (error: any) {
        return res.send({ success: false, message: error.message, payload: "friends list error with Error!" })
      }
    }
  }
}
