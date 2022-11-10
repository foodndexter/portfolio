import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AAppView, AButton } from "../components/forAttendency"
import { dexyRGB } from "../dexybase"

const Attendency = () => {
  const [buttons, setButtons] = useState<{ name: string; path: string }[]>([
    { name: "선생님용", path: "teacher" },
    { name: "학생용", path: "student" },
  ])
  const navi = useNavigate()
  const color = `rgb(${dexyRGB.navy})`
  return (
    <AAppView>
      {buttons &&
        buttons.map((btn) => (
          <AButton key={btn.name} onClick={() => navi(`/attendency/${btn.path}`)} width={200} margin={5} backgroundColor={color} borderColor={color}>
            {btn.name}
          </AButton>
        ))}
    </AAppView>
  )
}

export default Attendency
