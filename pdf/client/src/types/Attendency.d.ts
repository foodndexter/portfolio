type Theme = {
  color: "black"
  backgroundColor: "white"
  fontSize: 20
  fontWeight: 400 | 900
}

type AStudent = {
  name: string
  status: AStatus
  class: ClassList
  phone: string[]
}
type ClassList = "파닉스반" | "초5반" | "초6반" | "중1반" | "중2반" | "중3반" | "고1반" | "고2반"

type TeacherPages = "timetable" | "attendency" | "admin"

type Days = "일" | "월" | "화" | "수" | "목" | "금" | "토" | "없음"

type TimeTable = {
  day: Days
  schedule: Schedule[]
  id?: string
}

type Schedule = { time: string; class: ClassList }

type AStatus = "출석" | "결석" | "조퇴" | "남음" | "아픔" | "걍쉼" | "수업끝" | "학원가는길"

type ModalType = "off" | "login" | "addTimeTable" | "attendencyStudent"
