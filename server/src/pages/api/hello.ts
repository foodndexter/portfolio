// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { useBcrypt } from "@/hooks"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const name = await useBcrypt.hash("john Doe")
  res.status(200).json({ name })
}
