import bcrypt from "bcryptjs"
import crypto from "crypto"

const useCryptos = {
  hash: async (password: string): Promise<string> => {
    return await bcrypt.hashSync(password, 12)
  },
  compare: async (password: string, originalPwd: string): Promise<boolean> => {
    return await bcrypt.compare(password, originalPwd)
  },
  getUid: (): string => crypto.randomBytes(16).toString("hex"),
}

export default useCryptos
