import React from "react"
import { dexyStyle } from "../../styles"

export const LectureItem = (props: { item: Lecture; type: "img" | "icon" }) => {
  const { item, type } = props
  const { amount, book, chapter, name, title, lec1, lec2, lec3, price, sort, src1, src2, src3, category, icon, img, lec4, src4 } = item
  const fullName = `${category} ${book} ${chapter} ${title} ${name}`

  return (
    <div>
      <div>
        <img src={type === "img" ? img : icon} alt={name} />
      </div>
      <div>{fullName}</div>
    </div>
  )
}

export const LectureBox = () => {
  return (
    <div>
      <div style={{ ...dexyStyle.sampleImg, border: "2px solid" }}></div>
      <div style={{ border: "1px solid", ...dexyStyle.btnWrap }}></div>
    </div>
  )
}
