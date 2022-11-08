import React from "react"
import { getPrice } from "../components"
import { useAppSelector } from "../redux/hooks"
import { paymentStyle } from "../styles"
import { FiSearch } from "react-icons/fi"

const EvasPayments = () => {
  const { user } = useAppSelector((state) => state)

  return (
    <div>
      {user.payments ? (
        <>
          <Filter />
          {user.payments.map((item, index) => (
            <PaymentItem item={item} key={index} />
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

const PaymentItem = (props: { item: MyLecture }) => {
  const { item } = props
  const { category, book, chapter, title, name, price, purchasedAt, remaining } = item

  const onClick = () => {
    console.log(item)
  }

  return (
    <div style={paymentStyle.iContainer}>
      <div style={paymentStyle.iNames}>
        <span style={paymentStyle.inTitle}>
          {category} {book} {chapter} {title}
        </span>
        <span style={paymentStyle.inSubTitle}>{name}</span>
        <span style={paymentStyle.idPurchasedAt}>{purchasedAt}</span>
      </div>
      <button style={paymentStyle.idButton} onClick={onClick}>
        <FiSearch size={20} />
        <span>상세내역</span>
      </button>
    </div>
  )
}

export default EvasPayments
