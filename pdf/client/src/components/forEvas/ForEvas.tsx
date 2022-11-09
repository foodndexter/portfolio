import React, { useEffect, useState } from "react"
import { brotliDecompress } from "zlib"
import { dexyRGB, userbarIcons } from "../../dexybase"
import { dexyStyle, lectureBox, lectureItem, userbar } from "../../styles"
import { ResponsiveBox169 } from "../DexyReact"
import { BsCartPlus } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { alertHandler, confirmHandler } from "../../redux/reducers/sampleSlice"
import { useStateContext } from "../../contextApi/StateProvider"
import { cartHandler } from "../../redux/reducers/userSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { AiOutlineFolder, AiOutlineFolderOpen, AiOutlineCreditCard, AiFillFolderOpen } from "react-icons/ai"
import { BsCart3 } from "react-icons/bs"
import { BiHomeAlt, BiExit } from "react-icons/bi"
import { spawn } from "child_process"

type CSS = React.CSSProperties
export const LectureItem = (props: { item: Lecture; type: "img" | "icon" }) => {
  const { item, type } = props
  const { amount, book, chapter, name, title, sort, category, icon, img } = item
  const fullName = `${category} ${book} ${chapter}`

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state)
  const [price, setPrice] = useState("")
  useEffect(() => {
    setPrice(getPrice(item.price))
  }, [item.price])

  const onCartIcon = () => {
    if (user.state) {
      console.log(item.id, user.cart)
      const check = user.cart.find((target) => target.id === item.id)
      if (check) {
        dispatch(alertHandler({ state: true, message: "이미 담긴 강의입니다.", okBtn: "확인" }))
      } else {
        dispatch(cartHandler(item))
        dispatch(confirmHandler({ state: true, message: "장바구니에 담았습니다.", okBtn: "장바구니로", cancelBtn: "계속보기", type: "go cart" }))
      }
    } else {
      dispatch(confirmHandler({ state: true, cancelBtn: "취소", message: "회원에게만 제공된 기능입니다. 로그인하시겠습니까?", okBtn: "로그인", type: "login" }))
    }
  }

  const [isHovering, setIsHovering] = useState(false)

  type Styling = { screen: CSS; imgTitle: CSS }
  const initialStyle: Styling = {
    screen: { ...lectureItem.screen },
    imgTitle: { fontWeight: 900, fontSize: 25, ...dexyStyle.oneLine, textAlign: "center" },
  }
  const [style, setStyle] = useState<Styling>(initialStyle)

  useEffect(() => {
    if (isHovering) {
      setStyle({ screen: { ...style.screen, backgroundColor: "rgba(0,0,0,.05)" }, imgTitle: { ...style.imgTitle } })
    } else setStyle(initialStyle)
  }, [isHovering])

  const { screen } = useStateContext()

  const initialContainer: CSS = lectureItem.container
  const [containerStyle, setContainerStyle] = useState<CSS>(initialContainer)
  const [width, setWidth] = useState("100%")
  useEffect(() => {
    if (screen.width < 400) setWidth("100%")
    if (screen.width >= 400) setWidth("50%")
    if (screen.width >= 768) setWidth("33.3333333%")
    if (screen.width >= 1200) setWidth("25%")
  }, [screen])

  useEffect(() => {
    setContainerStyle({ ...initialContainer, width })
  }, [width])
  return (
    <div style={containerStyle} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div style={lectureItem.imgWrap}>
        <div style={lectureItem.titleInImg}>
          <span style={style.imgTitle}>{name}</span>
          <span style={{ ...dexyStyle.oneLine, textAlign: "center" }}>{title}</span>
        </div>
        <div style={style.screen}></div>
        <img src={type === "img" ? img : icon} alt={name} style={isHovering ? { transform: "scale(1.03)" } : undefined} />
      </div>
      <div style={lectureItem.info}>
        <p>{fullName}</p>
        <p>{amount}개의 강의</p>
        <p>{price}원</p>
      </div>
      <button onClick={onCartIcon} style={lectureItem.icon}>
        <BsCartPlus size={25} />
      </button>
    </div>
  )
}

export const LectureBox = (props: { btns: LectureBoxBtn[]; src: number }) => {
  const { btns, src } = props

  const contentsHandler = (index: number) => setContents(index)

  const [contents, setContents] = useState(0)

  return (
    <div>
      <ResponsiveBox169>
        {btns[contents].name === "미리보기" ? (
          <Vimeo src={src} />
        ) : (
          <div>
            <div>{btns[contents].short && btns[contents].short.map((line, index) => <span key={index}>{line}</span>)}</div>
          </div>
        )}
      </ResponsiveBox169>
      <div style={{ ...dexyStyle.btnWrap, ...lectureBox.btnWrap }}>
        {btns &&
          btns.map((btn, index) => {
            let border: React.CSSProperties = { borderLeft: "none" }
            if (index === 0) border = { borderLeft: "1px solid" }
            if (index === contents) border = { color: "white", borderColor: `rgb(${dexyRGB.navy})`, backgroundColor: `rgb(${dexyRGB.navy})` }
            return (
              <button key={index} onClick={() => contentsHandler(index)} style={{ ...lectureBox.btns, ...border }}>
                {btn.name}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export const Vimeo = (props: { src: number }) => {
  const [src, setSrc] = useState("")
  useEffect(() => {
    props.src && setSrc(`https://player.vimeo.com/video/${props.src}`)
  }, [props.src])

  return (
    <div style={{ paddingBottom: "56.25%", maxWidth: "100%", position: "relative" }}>
      <iframe src={src} frameBorder="0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></iframe>
    </div>
  )
}

export const getPrice = (price: number) => {
  let result: string = String(price)
  const length = result.length
  const array = result.split("")
  switch (length) {
    case 4:
      return (result = `${array[0]},${array[1]}${array[2]}${array[3]}`)
    case 5:
      return (result = `${array[0]}${array[1]},${array[2]}${array[3]}${array[4]}`)
  }

  return result
}

export const UserBar = () => {
  const { pathname } = useLocation()
  const { user } = useAppSelector((state) => state)
  const { state, lectures } = user

  const icons = [
    pathname.includes("myLec") ? <AiFillFolderOpen size={30} /> : <AiOutlineFolder size={30} />,
    <BsCart3 size={28} />,
    <BiHomeAlt size={30} />,
    <AiOutlineCreditCard size={30} />,
    <BiExit size={30} />,
  ]

  const { screen } = useStateContext()

  type UserBarStyle = { container: CSS; wrap: CSS; icons: CSS }
  const initialStyle: UserBarStyle = { container: userbar.container, wrap: userbar.wrap, icons: userbar.icons }
  const [styling, setStyling] = useState<UserBarStyle>(initialStyle)

  useEffect(() => {
    if (screen.width >= 1200) {
      setStyling({ ...initialStyle })
    } else setStyling(initialStyle)
  }, [screen])

  const navi = useNavigate()
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector((state) => state.user)
  const onClick = (item: { name: string; path?: string }) => {
    const { path, name } = item
    if (path) {
      navi(`/evas/${path}`)
    } else {
      if (name === "home") {
        navi("/evas")
      } else dispatch(confirmHandler({ state: true, message: "정말 로그아웃 하시겠습니까?", okBtn: "로그아웃", cancelBtn: "취소", type: "logout" }))
    }
  }

  const [myLecture, setMyLecture] = useState<MyLecture[]>([])
  useEffect(() => {
    let copy: MyLecture[] = []
    lectures &&
      lectures.map((item) => {
        if (item.remaining && item.remaining > 25) return (copy = [...copy, item])
      })
    setMyLecture(copy)
  }, [lectures])

  return (
    <>
      {pathname.includes("evas") && state && (
        <div style={styling.container}>
          <div style={styling.wrap}>
            {userbarIcons &&
              userbarIcons.map((item, index) => (
                <button
                  key={index}
                  style={index === 1 || index === 0 ? { ...styling.icons, position: "relative" } : styling.icons}
                  onClick={() => onClick(item)}>
                  {index === 1 && cart.length > 0 && <span style={userbar.cartNumber}>{cart.length}</span>}
                  {index === 0 && myLecture.length > 0 && <span style={userbar.cartNumber}>{myLecture.length}</span>}
                  {icons[index]}
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
