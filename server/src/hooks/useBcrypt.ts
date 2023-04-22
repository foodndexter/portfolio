import { API } from "@/context"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const useBcrypt = {
  hash: async (input: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(12)
    return await bcrypt.hash(input, salt)
  },

  compare: async (password: string, saltedPassword: string): Promise<API> => {
    const success = await bcrypt.compare(password, saltedPassword)
    return {
      success,
    }
  },

  getUid: (): string => {
    const uid = crypto.randomBytes(16).toString("hex")
    return uid
  },
}

export default useBcrypt
