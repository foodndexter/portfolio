import React, { useEffect, useRef, useState } from "react"
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi"
import { dexyBanner } from "../../dexybase"
import { banner, dexyStyle } from "../../styles"
import { ResponsiveBox169 } from "../DexyReact"

type HandleContents = (index: number) => void
type Direction = "prev" | "next"

const DexyBanner = (props: { navi: any }) => {
  const { navi } = props
  const [contents, setContents] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const playHandler = () => setIsPlaying((prev) => !prev)
  const controller = (direction: Direction): any => {
    const length: number = dexyBanner.length - 1
    switch (direction) {
      case "next":
        return setContents((prev) => (prev === length ? 0 : prev + 1))
      case "prev":
        return setContents((prev) => (prev === 0 ? length : prev - 1))
    }
  }

  const [ref, setRef] = useState(useRef(contents))
  useEffect(() => {
    setRef({ current: contents })
  }, [contents])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => controller("next"), 2 * 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, ref])

  const contentsHandler = (index: number) => setContents(index)
  return (
    <div style={banner.container}>
      <CTRLS onClick={controller} isPlaying={isPlaying} playHandler={playHandler} />
      <ResponsiveBox169 style={{ backgroundColor: dexyBanner[contents].img }}></ResponsiveBox169>
      <Indicators contents={contents} contentsHandler={contentsHandler} />
    </div>
  )
}

export default DexyBanner

const CTRLS = (props: { onClick: (direction: Direction) => void; isPlaying: boolean; playHandler: () => void }) => {
  const { onClick, isPlaying, playHandler } = props
  return (
    <>
      <div style={banner.ctrlWrap}>
        <button onClick={() => onClick("prev")} style={{ ...banner.btns, ...banner.prevBtn }}>
          <FiChevronLeft size={30} color="white" />
        </button>
        <button onClick={() => onClick("next")} style={{ ...banner.btns, ...banner.nextBtn }}>
          <FiChevronRight size={30} color="white" />
        </button>
      </div>
      <button onClick={playHandler} style={{ ...banner.btns, ...banner.playBtn }}>
        {isPlaying ? <FiPause size={20} color="white" /> : <FiPlay size={20} color="white" />}
      </button>
    </>
  )
}

type CSS = React.CSSProperties
const Indicators = (props: { contents: number; contentsHandler: HandleContents }) => {
  return (
    <div style={banner.indicators}>
      {dexyBanner && dexyBanner.map((item, index) => <Inner key={index} index={index} contents={props.contents} contentsHandler={props.contentsHandler} />)}
    </div>
  )
}

const Inner = (props: { index: number; contents: number; contentsHandler: HandleContents }) => {
  const { index, contents, contentsHandler } = props
  const initialStyle: CSS = banner.inner

  const [innerStyle, setInnerStyle] = useState<CSS>(initialStyle)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (index === contents) {
      setInnerStyle({ ...initialStyle, opacity: 1, width: 30 })
    } else {
      isHovering ? setInnerStyle({ ...initialStyle, opacity: 0.8 }) : setInnerStyle(initialStyle)
    }
  }, [index, contents, isHovering])
  return (
    <div style={banner.indicator} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => contentsHandler(index)}>
      <span style={innerStyle}></span>
    </div>
  )
}
