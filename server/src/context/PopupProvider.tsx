import { Button, Colors, Typo, View } from "@/modules"
import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react"
import { Alert, AlertButton, AlertFn } from "./types"

const initialState: Alert = { btns: [], message: null, title: null, alert: () => {}, closeAlert: () => {} }

const data = createContext(initialState)

export const PopupProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | null>("")
  const [title, setTitle] = useState<string | null>("")
  const [btns, setBtns] = useState<AlertButton[]>([])
  const alert: AlertFn = (messageProp: null | string, titleProp?: null | string, btnsProp?: AlertButton[]) => {
    messageProp && setMessage(messageProp)
    titleProp && setTitle(titleProp)
    btnsProp && setBtns(btnsProp)
    setIsAlertOn(true)
  }

  const [isAlertOn, setIsAlertOn] = useState(false)

  const closeAlert = () => {
    setIsAlertOn(false)
    setMessage(null)
    setTitle(null)
    setBtns([])
  }

  const value = useMemo(() => {
    return {
      alert,
      closeAlert,
      message,
      title,
      btns,
    }
  }, [alert, closeAlert, message, title, btns])

  return (
    <data.Provider value={value}>
      {isAlertOn && <AlertComponent {...value} />}
      {children}
    </data.Provider>
  )
}

function AlertComponent({ alert, closeAlert, btns, message, title }: Alert) {
  return (
    <View position={"fixed"} css={{ top: 0, left: 0, width: "100%", height: "100vh", zIndex: 10, justifyContent: "center", alignItems: "center" }}>
      <View
        position={"relative"}
        css={{
          borderRadius: 10,
          backgroundColor: Colors.WHITE,
          border: `1px solid ${Colors.LIGHTGRAY}`,
          overflow: "hidden",
          boxShadow: "0 3px 6px rgba(0, 0, 0, .2)",
        }}>
        <View
          position={"relative"}
          css={{ height: 40, justifyContent: "center", padding: "0 20px", borderBottom: `1px solid ${Colors.LIGHTGRAY}`, alignItems: "center" }}>
          <Typo weight={"BOLD"}>{title ?? "Oops!"}</Typo>
          <Button
            onClick={closeAlert}
            css={{
              padding: 0,
              width: 10,
              minHeight: 10,
              backgroundColor: Colors.RED,
              borderRadius: 10,
              border: "none",
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
            }}
          />
        </View>
        <View css={{ padding: "30px 20px" }}>{message ?? "메시지를 입력하세요."}</View>
        <View direction={"row"} css={{ borderTop: `1px solid ${Colors.LIGHTGRAY}` }}>
          {btns && btns.length > 0 ? (
            btns.map(({ name, onPress }, index) => (
              <Button
                css={{
                  width: "100%",
                  borderRadius: 0,
                  border: "none",
                  "&:hover": {
                    color: btns.length > 0 ? (index === 0 ? Colors.RED : Colors.BLUE) : Colors.BLUE,
                  },
                }}
                key={index}
                onClick={() => {
                  onPress && onPress()
                  closeAlert()
                }}>
                {name}
              </Button>
            ))
          ) : (
            <Button
              onClick={closeAlert}
              css={{
                width: "100%",
                borderRadius: 0,
                border: "none",
                "&:hover": {
                  color: Colors.BLUE,
                },
              }}>
              확인
            </Button>
          )}
        </View>
      </View>
      <View position={"absolute"} type="shadow" onClick={closeAlert} />
    </View>
  )
}

export function useAlert() {
  return useContext(data)
}
