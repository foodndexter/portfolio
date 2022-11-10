import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "./components"
import { dexyMenus } from "./dexybase"
import { authService } from "./firebase"
import { Attendency, AttendencyStudents, AttendencyTeachers, Blog, Evas, EvasChooseBook, EvasShowLectures, EvasTakeLectures, Home } from "./screens"

const App = () => {
  const dexyRouters = [<Evas />, <Attendency />, <Blog />]

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
