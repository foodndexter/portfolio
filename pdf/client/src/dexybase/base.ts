import { blackIcon, blueIcon, greenIcon, navyIcon, orangeIcon, purpleIcon, redIcon, whiteIcon, yellowIcon } from "./icons"

const srcs = [275602204, 66140585, 287903693, 282059182, 284319225, 301760075, 301767975, 296795894]
export const dexyMenus: Menus[] = [
  { name: "EVAS", path: "evas", img: "" },
  { name: "학원 출결 관리", path: "attendency", img: "" },
  { name: "블로그", path: "blog", img: "" },
]

export const dexyRGB: RGB = {
  black: "67,67,67",
  white: "255, 255, 255",
  red: "255, 108, 108",
  orange: "255, 193, 108",
  yellow: "252, 247, 247",
  green: "163, 226, 155",
  blue: "108, 193, 255",
  navy: "40, 61, 177",
  purple: "201, 159, 250",
}

export const dexyBanner: Banner[] = [
  { name: "고등내신", path: "gdns", img: `rgb(${dexyRGB.black})`, icon: blackIcon },
  { name: "모의고사", path: "megs", img: `rgb(${dexyRGB.red})`, icon: redIcon },
  { name: "수능특강", path: "sntg", img: `rgb(${dexyRGB.blue})`, icon: blueIcon },
  { name: "필수문법", path: "psmb", img: `rgb(${dexyRGB.purple})`, icon: purpleIcon },
]

export const gdns: CategoryList[] = [
  { name: "영어", path: "eng", icon: yellowIcon },
  { name: "영어I", path: "engI", icon: blueIcon },
  { name: "영어II", path: "engII", icon: blackIcon },
]

export const eng: BookList[] = [
  { name: "천재 이재영", path: "cjLee", icon: redIcon },
  { name: "YBM 박준언", path: "ybmPark", icon: orangeIcon },
  { name: "능률 김성곤", path: "neKim", icon: yellowIcon },
  { name: "비상 홍민표", path: "bsHong", icon: greenIcon },
  { name: "지학사 민찬규", path: "ghMin", icon: blueIcon },
]

export const megs: CategoryList[] = [
  { name: "고1", path: "go1", icon: redIcon },
  { name: "고2", path: "go2", icon: greenIcon },
]

export const go: BookList[] = [
  { name: "2022년", path: "year22", icon: purpleIcon },
  { name: "2021년", path: "year21", icon: blackIcon },
]

export const sntg: BookList[] = [
  { name: "23학번", path: "sn23", icon: navyIcon },
  { name: "22학번", path: "sn22", icon: purpleIcon },
]

export const psmb: BookList[] = [
  { name: "책이름 A", path: "bookA", icon: whiteIcon },
  { name: "책이름 B", path: "bookB", icon: blackIcon },
  { name: "책이름 C", path: "bookC", icon: redIcon },
]

export const engNeKim: NeKim[] = [
  {
    name: "The Part You Play",
    title: "The Final Touchdown",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "1과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 1,
  },
  {
    name: "The Power of Creativity",
    title: "FROM TRASH TO TREASURE",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "2과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 2,
  },
  {
    name: "Sound Life",
    title: "Art Heals",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "3과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 3,
  },
  {
    name: "Toward a Better World",
    title: "Put a Roof over Someone's Head",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "4과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 4,
  },
  {
    name: "What Matters Most",
    title: "Three Questions",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "5과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 5,
  },
  {
    name: "Beyond the Limits",
    title: "Against All Odds",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "6과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 6,
  },
  {
    name: "Finding Out the Wonders",
    title: "Hanji, Korea's Paper",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "7과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 7,
  },
  {
    name: "It's Up to You!",
    title: "How Teens Make Decisions",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "8과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 8,
  },
]

export const lectureBoxBtns: LectureBoxBtn[] = [
  { name: "미리보기", path: "", short: ["간단한 요약을 적습니다."], full: "전문을 적습니다.", img: redIcon },
  { name: "핵심공략", path: "", short: ["1. 이렇게 하면 됩니다.", "2. 저렇게 하면됩니다.", "3. 참 쉽죠?"], full: "", img: orangeIcon },
  { name: "이용약관", path: "", short: ["1. 이용약관 요약본 1", "2. 이용약관 요약본 2", "3. 이용약관 요약본 3"], full: "", img: greenIcon },
  { name: "환불규정", path: "", short: ["1. 환불규정 요약본 1", "2. 환불규정 요약본 2", "3. 환불규정 요약본 3"], full: "", img: blueIcon },
]

export const userbarIcons: { name: string; path?: string }[] = [
  { name: "myLec", path: "myLec" },
  { name: "cart", path: "cart" },
  { name: "home" },
  { name: "payments", path: "payments" },
  { name: "signout" },
]

export const samplePayments: MyLecture[] = [
  {
    name: "The Part You Play",
    title: "The Final Touchdown",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "1과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 1,
    expiresIn: 28,
    purchasedAt: "10/15/2022",
    remaining: 3,
  },
  {
    name: "The Power of Creativity",
    title: "FROM TRASH TO TREASURE",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률 김성곤",
    img: "",
    icon: redIcon,
    chapter: "2과",
    price: 10000,
    lec: ["1강", "2강", "3강"],
    src: [275602204, 66140585, 287903693],
    id: 2,
    expiresIn: 28,
    purchasedAt: "10/11/2022",
    remaining: -1,
  },
]
