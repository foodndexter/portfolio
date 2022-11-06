import React, { ReactNode, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { alertHandler, confirmHandler, modalHandler } from "../../redux/reducers/sampleSlice"
import { AppDispatch } from "../../redux/store"
import { popup } from "../../styles"
import { LoginModal } from "./Modals"

type CSS = React.CSSProperties
const Layout = (props: { children: ReactNode; type: "alert" | "modal" | "confirm"; dispatch: AppDispatch; switch: boolean; closeFn: () => void }) => {
  const { children, type, closeFn } = props

  const style: CSS = popup.container
  const initialStyle: CSS = type === "alert" ? { ...style, zIndex: 10 } : type === "confirm" ? { ...style, zIndex: 9 } : { ...style, zIndex: 8 }

  const [popupStyle, setPopupStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    if (props.switch) {
      setPopupStyle({ ...initialStyle, top: 60, maxHeight: `100%`, visibility: "visible", opacity: 1 })
    } else setPopupStyle(initialStyle)
  }, [props.switch])

  return (
    <div style={popupStyle}>
      <div style={popup.body}>{children}</div>
      <div onClick={closeFn} style={popup.bg}></div>
    </div>
  )
}

export const DexyAlert = () => {
  const dispatch = useAppDispatch()
  const { alert } = useAppSelector((state) => state.sample)
  const { state, message, okBtn } = alert

  const closeFn = () => dispatch(alertHandler("off"))
  return (
    <Layout type="alert" dispatch={dispatch} closeFn={closeFn} switch={state}>
      <div>
        <span>{message}</span>
        <button onClick={closeFn}>{okBtn}</button>
      </div>
    </Layout>
  )
}

export const DexyConfirm = () => {
  const dispatch = useAppDispatch()
  const { confirm } = useAppSelector((state) => state.sample)
  const { state, message, okBtn, cancelBtn, type } = confirm

  const closeFn = () => {
    dispatch(confirmHandler("off"))
    console.log("closing...")
  }

  const onOK = () => {
    console.log(type)
    if (type === "login") {
      console.log("login modal")
      dispatch(modalHandler("login"))
    }
    closeFn()
  }

  return (
    <Layout type="confirm" dispatch={dispatch} closeFn={closeFn} switch={state}>
      <div>
        <span>{message}</span>
        <div>
          <button onClick={onOK}>{okBtn}</button>
          <button onClick={closeFn}>{cancelBtn}</button>
        </div>
      </div>
    </Layout>
  )
}

export const DexyModal = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector((state) => state.sample)
  const { state, type } = modal

  const closeFn = () => dispatch(modalHandler("off"))
  return (
    <Layout type="modal" dispatch={dispatch} closeFn={closeFn} switch={state}>
      {type &&
        {
          login: <LoginModal closeFn={closeFn} dispatch={dispatch} />,
        }[type]}
    </Layout>
  )
}
