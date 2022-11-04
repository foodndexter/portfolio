import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "./components"
import { dexyMenus } from "./dexybase"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { AppDispatch } from "./redux/store"
import { Attendency, Blog, Evas, EvasChooseBook, Home } from "./screens"

const App = () => {
  const dexyRouters = [<Evas />, <Attendency />, <Blog />]

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {dexyMenus && dexyMenus.map((router, index) => <Route path={`/${router.path}`} key={index} element={dexyRouters[index]} />)}
        <Route path="/evas/:sort" element={<EvasChooseBook />} />
      </Routes>
    </Layout>
  )
}

export default App
