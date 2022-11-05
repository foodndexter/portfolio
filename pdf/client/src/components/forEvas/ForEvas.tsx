import React, { useEffect, useState } from "react"
import { brotliDecompress } from "zlib"
import { dexyRGB } from "../../dexybase"
import { dexyStyle, lectureBox, lectureItem } from "../../styles"
import { ResponsiveBox169 } from "../DexyReact"
import { BsCartPlus } from "react-icons/bs"

export const LectureItem = (props: { item: Lecture; type: "img" | "icon" }) => {
  const { item, type } = props
  const { amount, book, chapter, name, title, lec1, lec2, lec3, sort, src1, src2, src3, category, icon, img, lec4, src4 } = item
  const fullName = `${category} ${book} ${chapter}`

  const [price, setPrice] = useState("")
  useEffect(() => {
    chapter === "1과" && setPrice(getPrice(item.price))
  }, [item.price])

  const onCartIcon = () => {
    console.log(item.chapter, item.price)
  }

  return (
    <div style={lectureItem.container}>
      <div>
        <div>{title}</div>
        <img src={type === "img" ? img : icon} alt={name} />
      </div>
      <div>
        <div>{fullName}</div>
        <div>{amount}개의 강의</div>
        <div>{price}원</div>
      </div>
      <button onClick={onCartIcon}>
        <BsCartPlus size={30} />
      </button>
    </div>
  )
}

export const LectureBox = (props: { btns: LectureBoxBtn[]; src: number }) => {
  const { btns } = props

  const [src, setSrc] = useState("")
  useEffect(() => {
    props.src && setSrc(`https://player.vimeo.com/video/${props.src}`)
  }, [props.src])
  const contentsHandler = (index: number) => setContents(index)

  const [contents, setContents] = useState(0)

  return (
    <div>
      <ResponsiveBox169>
        {btns[contents].name === "미리보기" ? (
          <div style={{ paddingBottom: "56.25%", maxWidth: "100%", position: "relative" }}>
            <iframe src={src} frameBorder="0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></iframe>
          </div>
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
