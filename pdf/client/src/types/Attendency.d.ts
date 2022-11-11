type Theme = {
  color: string
  backgroundColor: string
  fontSize: number
  fontWeight: 400 | 900
}

type AStudent = {
  name: string
  status: AStatus
  class: ClassList
  phone: string[]
  time?: string
}
type ClassList = "파닉스반" | "초5반" | "초6반" | "중1반" | "중2반" | "중3반" | "고1반" | "고2반" | ""

type TimeList = "14:00 - 14:50" | "15:00 - 15:50" | "16:00 - 17:00" | "17:30 - 18:50" | "19:00 - 20:50" | "21:00 - 21:50"

type TeacherPages = "timetable" | "attendency" | "admin"

type Days = "일" | "월" | "화" | "수" | "목" | "금" | "토" | ""

type TimeTable = {
  day: Days
  schedule: Schedule[]
  id?: string
}

type Schedule = { time: string; class: ClassList } | { time: ""; class: "" }

type AStatus = "출석" | "결석" | "조퇴" | "남음" | "아픔" | "걍쉼" | "귀가" | "학원가는길" | "학원도착" | "수업끝" | ""

type ModalType = "off" | "login" | "addTimeTable" | "attendencyStudent" | "showLeftStudents"
