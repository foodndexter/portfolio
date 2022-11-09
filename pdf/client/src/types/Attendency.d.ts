type Theme = {
  color: "black"
  backgroundColor: "white"
  fontSize: 20
  fontWeight: 400 | 900
}

type AStudent = {
  name: string
  status: "attended" | "absent" | "left" | "remaining" | "dayoff" | "onTheWay"
  class: "파닉스반" | "초5반" | "초6반" | "중1반" | "중2반" | "중3반" | "고1반" | "고2반"
  phone: string[]
}
