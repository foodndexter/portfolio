import React from "react"
import { getPrice } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { paymentStyle } from "../styles"
import { FiSearch } from "react-icons/fi"
import { AppDispatch } from "../redux/store"
import { alertHandler } from "../redux/reducers/sampleSlice"
import { liftHandler } from "../redux/reducers/lifter"

const EvasPayments = () => {
  const { user } = useAppSelector((state) => state)

  const dispatch = useAppDispatch()
  return (
    <div style={paymentStyle.container}>
      {user.payments ? (
        <>
          <Filter />
          {user.payments.map((item, index) => (
            <PaymentItem dispatch={dispatch} item={item} key={index} />
          ))}
        </>
      ) : (
        <>nothing</>
      )}
      <div></div>
    </div>
  )
}

const Filter = () => {
  return <div>Filter</div>
}

const PaymentItem = (props: { item: MyLecture; dispatch: AppDispatch }) => {
  const { item, dispatch } = props
  const { category, book, chapter, title, name, price, purchasedAt, remaining } = item

  const onClick = () => {
    console.log(item)
    dispatch(liftHandler(item))
    dispatch(alertHandler({ state: true, type: "payments", okBtn: "확인" }))
  }

  return (
    <div style={paymentStyle.iContainer}>
      <div style={paymentStyle.iiNames}>
        <span style={paymentStyle.iTitle}>
          {category} {book} {chapter} {title} {name}
        </span>
        <span style={paymentStyle.iiPrice}>{getPrice(price)}원</span>
        <span style={paymentStyle.iiPurchasedAt}>{purchasedAt}</span>
      </div>
      <button style={paymentStyle.iiButton} onClick={onClick}>
        <FiSearch size={18} />
        <span>상세내역</span>
      </button>
    </div>
  )
}

export default EvasPayments
