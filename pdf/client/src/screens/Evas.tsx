import React from "react"
import { useNavigate } from "react-router-dom"
import { DexyBanner, DexyIcon } from "../components"
import { redIcon, blackIcon, greenIcon, orangeIcon, dexyBanner } from "../dexybase"
import { dexyStyle } from "../styles"

const Evas = () => {
  const navi = useNavigate()
  return (
    <>
      <DexyBanner navi={navi} />
      <AppIcons navi={navi} />
    </>
  )
}

export default Evas

const AppIcons = (props: { navi: any }) => {
  const icons = [redIcon, blackIcon, greenIcon, orangeIcon]

  const onClick = (item: Menus) => {
    props.navi(`/evas/${item.path}`)
  }
  return (
    <div style={{ ...dexyStyle.btnWrap, marginTop: 20 }}>
      {dexyBanner &&
        dexyBanner.map((item, index) => <DexyIcon key={index} onClick={() => onClick(item)} name={item.name} src={item.icon} style={{ margin: "0 10px" }} />)}
    </div>
  )
}
