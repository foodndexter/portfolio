type Sample = {
  backgroundColor: string
  color: string
  fontSize: number
  fontWeight: number
  fontFamily?: string
  activeMenu: boolean
}

type HandleMenu = { payload: "toggle" | "on" | "off" }

type Device = "mobile" | "tablet" | "pc"
type Function = (any: any) => void

type Menus = { name: string; path: string; img: string }
type Banner = Menus & { icon: string }

type RGB = { black: string; white: string; red: string; orange: string; yellow: string; green: string; blue: string; navy: string; purple: string }

type Sort = "gdns" | "megs" | "sntg" | "psmb" | "library" | "contactus"
type SortKor = "고등내신" | "모의고사" | "수능특강" | "필수문법" | "자료실" | "고객센터"

type Category = "eng" | "engI" | "engII" | "go1" | "go2"
type CategoryKor = "eng" | "engI" | "engII" | "go1" | "go2"

type Books = "cjLee" | "bsHong" | "ghMin" | "neKim" | "ybmPark" | "year21" | "year22" | "sn23" | "sn22" | "bookA" | "bookB" | "bookC"
type BooksKor = "cjLee" | "bsHong" | "ghMin" | "neKim" | "ybmPark" | "year21" | "year22" | "sn23" | "sn22" | "bookA" | "bookB" | "bookC"

type SortList = { name: Sort; path: Sort; img?: string; icon?: string }

type CategoryList = { name: Category; path: string; img?: string; icon?: string }

type BookList = { name: Books; path: string; img?: string; icon?: string }
