type Sample = {
  backgroundColor: string
  color: string
  fontSize: number
  fontWeight: number
  fontFamily?: string
  activeMenu: boolean
  alert: Popup
  confirm: Popup
  modal: Popup
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

type CategoryKor = "영어" | "영어I" | "영어II" | "고1" | "고2"

type Book = "cjLee" | "bsHong" | "ghMin" | "neKim" | "ybmPark" | "year21" | "year22" | "sn23" | "sn22" | "bookA" | "bookB" | "bookC"

type BooksKor =
  | "천재 이재영"
  | "비상 홍민표"
  | "지학사 민찬규"
  | "능률 김성곤"
  | "YBM 박준언"
  | "2021년"
  | "2022년"
  | "23학번"
  | "22학번"
  | "책이름 A"
  | "책이름 B"
  | "책이름 C"

type SortList = { name: SortKor; path: Sort; img?: string; icon: string }

type CategoryList = { name: CategoryKor; path: Category; img?: string; icon: string }

type BookList = { name: BooksKor; path: Book; img?: string; icon: string }

type Lecture = {
  name: string
  title: string
  price: 10000 | 15000
  lec1: string
  lec2: string
  lec3: string
  lec4?: string
  src1?: string
  src2?: string
  src3?: string
  src4?: string
  amount: number
  chapter: Chapter | Part
  sort: SortKor
  category?: CategoryKor
  book: BooksKor
  img?: string
  icon?: string
}

type Chapter = "1과" | "2과" | "3과" | "4과" | "5과" | "6과" | "7과" | "8과" | "9과" | "10과" | "11과" | "12과"

type Part = "Part 1" | "Part 2" | "Part 3" | "Part 4"

type NeKimName =
  | "The Part You Play"
  | "The Power of Creativity"
  | "Sound Life"
  | "Toward a Better World"
  | "What Matters Most"
  | "Beyond the Limits"
  | "Finding Out the Wonders"
  | "It's Up to You!"

type NeKimTitle =
  | "The Final Touchdown"
  | "FROM TRASH TO TREASURE"
  | "Art Heals"
  | "Put a Roof over Someone's Head"
  | "Three Questions"
  | "Against All Odds"
  | "Hanji, Korea's Paper"
  | "How Teens Make Decisions"

type NeKim = Lecture & { name: NeKimName; title: NeKimTitle }

type ForGetLectures =
  | "engcjLee"
  | "engIcjLee"
  | "engIIcjLee"
  | "engbsHong"
  | "engIbsHong"
  | "engIIbsHong"
  | "engybmPark"
  | "engIybmPark"
  | "engIIybmPark"
  | "engghMin"
  | "engIghMin"
  | "engIIghMin"
  | "engIneKim"
  | "engIIneKim"
  | "engneKim"
  | "go1year21"
  | "go1year22"
  | "go2year21"
  | "go2year22"
  | Book

type LectureBoxBtn = { name: string; short: string[]; path: string; img: string; full: string }

type Popup = { state: boolean; message?: string; okBtn?: string; cancelBtn?: string; type?: string }

type User = {
  state?: boolean
  id: string
  password?: string
  cart: Lecture[]
  basket: Lecture[]
  lectures: Lecture[]
  payments: Lecture[]
}

type LoginInput = { id: string; password: string }
