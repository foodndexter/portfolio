import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"
import { fetchAttendency, patchAttendency } from "./api"
import { Layout } from "./components"
import { dexyMenus } from "./dexybase"
import { authService } from "./firebase"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { attendencyDataFetched, attendencyHandler } from "./redux/reducers/attendencySlice"
import { Attendency, AttendencyStudents, AttendencyTeachers, Blog, Evas, EvasChooseBook, EvasShowLectures, EvasTakeLectures, Home } from "./screens"

const App = () => {
  const dexyRouters = [<Evas />, <Attendency />, <Blog />]

  const { pathname } = useLocation()

  const [res, setRes] = useState<any>()
  useEffect(() => {
    // patchAttendency()
    if (pathname.includes("attendency")) {
      fetchAttendency(setRes)
    }
  }, [])

  const dispatch = useAppDispatch()
  useEffect(() => {
    res && dispatch(attendencyDataFetched(res))
  }, [res])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {dexyMenus && dexyMenus.map((router, index) => <Route path={`/${router.path}`} key={index} element={dexyRouters[index]} />)}
        <Route path="/evas/:sort" element={<EvasChooseBook />} />
        <Route path="/evas/:sort/:category" element={<EvasShowLectures />} />
        <Route path="/evas/myLec/lectures/:lecture" element={<EvasTakeLectures />} />
        <Route path="/attendency/student" element={<AttendencyStudents />} />
        <Route path="/attendency/teacher" element={<AttendencyTeachers />} />
      </Routes>
    </Layout>
  )
}

export default App
