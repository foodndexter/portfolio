import React, { ReactNode, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { header, sidebar } from "../../styles"
import { DexyView } from "../DexyReact"
import { HiOutlineMenuAlt2, HiOutlineMenuAlt1 } from "react-icons/hi"
import { IoCloseSharp } from "react-icons/io5"
import { AppDispatch } from "../../redux/store"
import { menuHandler } from "../../redux/reducers/sampleSlice"
import { dexyMenus } from "../../dexybase"
import { useLocation, useNavigate } from "react-router-dom"

interface Props {
  activeMenu: boolean
  onClick: (path: string) => void
}

const Layout = (props: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const { activeMenu, color } = useAppSelector((state) => state.sample)
  const navi = useNavigate()
  const onClick = (path: string) => {
    navi(`/${path}`)
    dispatch(menuHandler("off"))
  }
  return (
    <DexyView id="Dexy Portfolio" style={header.layout}>
      <Header onClick={onClick} activeMenu={activeMenu} color={color} dispatch={dispatch} />
      <Sidebar onClick={onClick} activeMenu={activeMenu} />
      {props.children}
    </DexyView>
  )
}

export default Layout

const Header = (props: Props & { color: string; dispatch: AppDispatch }) => {
  const { activeMenu, color, dispatch, onClick } = props

  const onLogo = () => {
    onClick("/")
  }

  const onMenu = () => dispatch(menuHandler("toggle"))

  const [isHovering, setIsHovering] = useState(false)
  const initialTitle = "Dexter Yoon"
  const [title, setTitle] = useState(initialTitle)

  const { pathname } = useLocation()
  useEffect(() => {
    pathname.includes("evas") && setTitle("EVAS")
    pathname.includes("attendency") && setTitle("출석부")
    pathname.includes("blog") && setTitle("DexyLog")
  }, [pathname])
  return (
    <div style={header.container}>
      <div style={header.wrap}>
        <button style={header.menu} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={onMenu}>
          {activeMenu ? <IoCloseSharp size={30} /> : isHovering ? <HiOutlineMenuAlt1 size={30} /> : <HiOutlineMenuAlt2 size={30} color={color} />}
        </button>
        <button style={header.logo} onClick={onLogo}>
          {title}
        </button>
      </div>
    </div>
  )
}

const Sidebar = (props: Props) => {
  const { activeMenu, onClick } = props

  return (
    <DexyView style={activeMenu ? { ...sidebar.container, opacity: 1, visibility: "visible" } : sidebar.container}>
      <div style={sidebar.wrap}>
        <button style={sidebar.menuItem} onClick={() => onClick("/")}>
          홈
        </button>
        {dexyMenus && dexyMenus.map((menu, index) => <MenuItem menu={menu} key={index} onClick={onClick} index={index} />)}
      </div>
    </DexyView>
  )
}

const MenuItem = (props: { menu: Menus; onClick: (path: string) => void; index: number }) => {
  const { menu, onClick, index } = props
  const { name, img, path } = menu
  return (
    <button style={index === 0 ? { ...sidebar.menuItem, fontWeight: 900 } : sidebar.menuItem} onClick={() => onClick(path)}>
      {name.toUpperCase()}
    </button>
  )
}
