import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DexyAppView, DexyView, ResponsiveBox169, Vimeo } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler } from "../redux/reducers/sampleSlice"
import { dexyStyle, takinglec } from "../styles"

type CSS = React.CSSProperties
const EvasTakeLectures = () => {
  const { lifter } = useAppSelector((state) => state)
  const params = useParams()

  const [lecture, setLecture] = useState<Lecture | undefined>(undefined)

  const { user } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!lifter.length) {
      if (!user.state) {
        dispatch(alertHandler({ state: true, message: "없는 페이지입니다.", okBtn: "확인", type: "not found" }))
      } else {
        user.lectures &&
          user.lectures.map((item) => {
            let fullName = `${item.sort} ${item.book} ${item.chapter}`
            if (item.category) fullName = `${item.sort} ${item.category} ${item.book} ${item.chapter}`
            if (fullName === params.lecture) return setLecture(item)
          })
      }
    } else {
      lifter && setLecture(lifter)
    }
  }, [lifter, user.state, lecture])

  const [contents, setContents] = useState(0)

  const changeContents = (num: number) => {
    setContents(num)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [contents])
  const initialStyle: CSS = { ...takinglec.contentsButtons, width: lecture && `${100 / lecture.lec.length}%`, borderColor: "black", borderLeft: "none" }
  const styleWithBorder: CSS = { ...initialStyle, borderLeft: "1px solid" }
  const indexNContents: CSS = { ...initialStyle, borderColor: "black", color: "white", backgroundColor: "black" }
  return (
    <div style={takinglec.container}>
      {lecture && lecture.lec && lecture.src && (
        <>
          <Vimeo src={lecture.src[contents]} />
          <div style={dexyStyle.btnWrap}>
            {lecture.lec &&
              lecture.lec.map((btn, index) => {
                let buttonStyle: React.CSSProperties = index === 0 ? styleWithBorder : initialStyle
                if (index === contents) buttonStyle = indexNContents
                return (
                  <button key={index} onClick={() => changeContents(index)} style={buttonStyle}>
                    {btn}
                  </button>
                )
              })}
          </div>
          <div style={takinglec.infoWrap}>
            <span style={takinglec.infoTitle}>{lecture.lec[contents]} 의 내용</span>
            <div style={takinglec.infoBody}>이러 이러 합니다.</div>
          </div>
        </>
      )}
    </div>
  )
}

export default EvasTakeLectures
