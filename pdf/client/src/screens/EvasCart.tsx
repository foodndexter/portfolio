import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DexyButton, DexyIcon, getPrice } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler } from "../redux/reducers/sampleSlice"
import { basketHandler } from "../redux/reducers/userSlice"
import { cartStyle, dexyStyle } from "../styles"
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md"

const EvasCart = () => {
  const { user } = useAppSelector((state) => state)

  const [cart, setCart] = useState<Lecture[]>([])
  const [basket, setBasket] = useState<Lecture[]>([])

  const navi = useNavigate()
  const whenEmpty = () => navi("/evas")

  useEffect(() => {
    setCart(user.cart)
    setBasket(user.basket)
  }, [user])
  return (
    <>
      {cart && cart.length > 0 ? (
        cart.map((item, index) => <CartItem key={index} item={item} basket={basket} />)
      ) : (
        <div style={{ ...dexyStyle.btnWrap, ...cartStyle.cartItemWrap }}>
          <span>담겨진 강의가 없습니다.</span>
          <DexyButton onClick={whenEmpty}>강의 보러 가기</DexyButton>
        </div>
      )}
      <Basket basket={basket} />
    </>
  )
}

export default EvasCart

const CartItem = (props: { item: Lecture; basket: Lecture[] }) => {
  const { item, basket } = props
  const { name, title, img, icon, id, category, book, chapter } = item
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(basketHandler(item))
  }

  const [isInBasket, setIsInBasket] = useState(false)

  useEffect(() => {
    const check = basket.find((target) => target.id === id)
    if (check) {
      setIsInBasket(true)
    } else setIsInBasket(false)
    console.log(basket)
  }, [basket])

  const [price, setPrice] = useState("")
  useEffect(() => {
    setPrice(getPrice(item.price))
  }, [item.price])
  return (
    <button style={cartStyle.cartItem} onClick={onClick}>
      {icon && <img src={icon} alt={name} style={{ width: 60 }} />}
      <div style={cartStyle.middleArea}>
        <span>
          {category} {book} {chapter}
        </span>
        <p style={dexyStyle.oneLine}>{name}</p>
      </div>
      <button style={cartStyle.checkArea}>
        <span>{isInBasket ? <MdOutlineCheckBox size={25} /> : <MdOutlineCheckBoxOutlineBlank size={25} />}</span>
        <span>{price}원</span>
      </button>
    </button>
  )
}

type CSS = React.CSSProperties
const Basket = (props: { basket: Lecture[] }) => {
  const { basket } = props
  const [subTotal, setSubTotal] = useState(0)
  const [price, setPrice] = useState("")

  useEffect(() => {
    let priceList: number[] = []
    basket.map((item) => (priceList = [...priceList, item.price]))
    const total = priceList.reduce((a, b) => a + b, 0)
    setSubTotal(total)
    setPrice(getPrice(total))
    if (basket.length > 0) {
      setBasketStyle({ ...initialStyle, visibility: "visible", opacity: 1 })
    }
    setBasketStyle(initialStyle)
  }, [basket])

  const initialStyle: CSS = cartStyle.basket
  const [basketStyle, setBasketStyle] = useState<CSS>(initialStyle)

  return (
    <div style={basketStyle}>
      {basket.length}개의 강의: {price}원
    </div>
  )
}
