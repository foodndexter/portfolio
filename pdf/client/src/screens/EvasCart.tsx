import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DexyAppView, DexyButton, DexyIcon, DexyView, getPrice } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler, confirmHandler } from "../redux/reducers/sampleSlice"
import { basketHandler, CBController, paymentHandler } from "../redux/reducers/userSlice"
import { cartStyle, dexyStyle } from "../styles"
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { AppDispatch } from "../redux/store"

const EvasCart = () => {
  const { user } = useAppSelector((state) => state)

  const [cart, setCart] = useState<Lecture[]>([])
  const [basket, setBasket] = useState<Lecture[]>([])

  const navi = useNavigate()
  const dispatch = useAppDispatch()

  const whenEmpty = () => navi("/evas")

  useEffect(() => {
    setCart(user.cart)
    setBasket(user.basket)
  }, [user])
  return (
    <DexyView style={{ margin: "65px 0 125px", maxWidth: 500 }}>
      {cart && cart.length > 0 ? (
        <>
          <BasketCtrl dispatch={dispatch} cart={cart} basket={basket} />
          {cart.map((item, index) => (
            <CartItem key={index} item={item} basket={basket} dispatch={dispatch} />
          ))}
        </>
      ) : (
        <div style={{ ...dexyStyle.btnWrap, ...cartStyle.cartItemWrap }}>
          <span>담겨진 강의가 없습니다.</span>
          <DexyButton onClick={whenEmpty}>강의 보러 가기</DexyButton>
        </div>
      )}
      <Basket basket={basket} navi={navi} dispatch={dispatch} />
    </DexyView>
  )
}

export default EvasCart

const CartItem = (props: { item: Lecture; basket: Lecture[]; dispatch: AppDispatch }) => {
  const { item, basket, dispatch } = props
  const { name, img, icon, id, category, book, chapter } = item
  const onClick = () => {
    dispatch(basketHandler(item))
  }

  const [isInBasket, setIsInBasket] = useState(false)

  useEffect(() => {
    const check = basket.find((target) => target.id === id)
    if (check) {
      setIsInBasket(true)
    } else setIsInBasket(false)
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
      <div style={cartStyle.checkArea}>
        <span>{isInBasket ? <MdOutlineCheckBox size={25} /> : <MdOutlineCheckBoxOutlineBlank size={25} />}</span>
        <span>{price}원</span>
      </div>
    </button>
  )
}

type CSS = React.CSSProperties

const Basket = (props: { basket: Lecture[]; navi: any; dispatch: AppDispatch }) => {
  const { basket, dispatch } = props
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
    } else setBasketStyle(initialStyle)
  }, [basket])

  const initialStyle: CSS = cartStyle.basket
  const [basketStyle, setBasketStyle] = useState<CSS>(initialStyle)

  const onPayBtn = () => {
    console.log("toss payment has been made")
    dispatch(paymentHandler())
    dispatch(
      confirmHandler({ state: true, message: "결제완료 되었습니다. 나의강의에서 확인해보시겠습니까?", okBtn: "네 ㄱㄱ", cancelBtn: "ㄴㄴ", type: "mylec" })
    )
  }

  return (
    <div style={basketStyle}>
      <div style={cartStyle.basketWrap}>
        <span>
          {basket.length}개의 강의: {price}원
        </span>{" "}
        <button onClick={onPayBtn} style={cartStyle.paybtn}>
          결제하기
        </button>
      </div>
    </div>
  )
}

const BasketCtrl = (props: { dispatch: AppDispatch; basket: Lecture[]; cart: Lecture[] }) => {
  const { dispatch, basket, cart } = props

  const buttons: string[] = ["전체선택", "장바구니 비우기"]

  const onClick = (name: string) => {
    if (name === "전체선택") {
      if (basket.length > 0 && basket === cart) {
        console.log("all in basket")
        dispatch(CBController("unselect all"))
      } else dispatch(CBController("select all"))
    } else if (name === "장바구니 비우기") dispatch(CBController("empty cart"))
  }
  return (
    <div style={cartStyle.basketCtrl}>
      <div style={cartStyle.bcWrap}>
        {buttons &&
          buttons.map((item, index) => (
            <button key={index} style={cartStyle.bcButtons} onClick={() => onClick(item)}>
              {index === 0 ? (basket.length > 0 && cart === basket ? "전체선택해제" : item) : item}
            </button>
          ))}
      </div>
    </div>
  )
}
