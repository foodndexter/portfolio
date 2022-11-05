import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "./components"
import { dexyMenus } from "./dexybase"
import { Attendency, Blog, Evas, EvasChooseBook, EvasShowLectures, Home } from "./screens"

const App = () => {
  const dexyRouters = [<Evas />, <Attendency />, <Blog />]

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {dexyMenus && dexyMenus.map((router, index) => <Route path={`/${router.path}`} key={index} element={dexyRouters[index]} />)}
        <Route path="/evas/:sort" element={<EvasChooseBook />} />
        <Route path="/evas/:sort/:category" element={<EvasShowLectures />} />
      </Routes>
    </Layout>
  )
}

export default App
