import React from "react"
import { useNavigate } from "react-router-dom"
import { DexyAppView } from "../components"
import { dexyMenus } from "../dexybase"
import { dexyStyle } from "../styles"

const Home = () => {
  const navi = useNavigate()
  return (
    <DexyAppView>
      {dexyMenus &&
        dexyMenus.map((menu, index) => (
          <button key={index} onClick={() => navi(menu.path)} style={dexyStyle.appButton}>
            {menu.name} 바로가기
          </button>
        ))}
    </DexyAppView>
  )
}

export default Home
