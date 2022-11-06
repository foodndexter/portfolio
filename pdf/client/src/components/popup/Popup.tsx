import React, { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { alertHandler, confirmHandler, modalHandler } from "../../redux/reducers/sampleSlice"
import { AppDispatch } from "../../redux/store"
import { alertStyle, confirmStyle, dexyStyle, popup } from "../../styles"
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
      <div style={alertStyle.container}>
        <span style={alertStyle.message}>{message}</span>
        {/* <div style={{ ...dexyStyle.btnWrap, justifyContent: "flex-end" }}> */}
        <button onClick={closeFn} style={alertStyle.button}>
          {okBtn}
        </button>
        {/* </div> */}
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
  }

  const navi = useNavigate()
  const onOK = () => {
    if (type === "login") {
      dispatch(modalHandler("login"))
    } else if (type === "go cart") {
      navi("/evas/cart")
    }
    closeFn()
  }

  return (
    <Layout type="confirm" dispatch={dispatch} closeFn={closeFn} switch={state}>
      <div style={alertStyle.container}>
        <span style={alertStyle.message}>{message}</span>
        <div style={dexyStyle.btnWrap}>
          <button onClick={onOK} style={{ ...alertStyle.button, ...confirmStyle.okBtn }}>
            {okBtn}
          </button>
          <button onClick={closeFn} style={{ ...alertStyle.button, ...confirmStyle.cancleBtn }}>
            {cancelBtn}
          </button>
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
