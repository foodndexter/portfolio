import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DexyAppView, LectureBox, LectureItem } from "../components"
import { engNeKim } from "../dexybase"

const EvasShowLectures = () => {
  const { category } = useParams()
  const [lectures, setLectures] = useState<Lecture[]>([])
  useEffect(() => {
    if (category) {
      setLectures(getLectues(category))
    }
  }, [category])

  useEffect(() => {
    console.log(lectures)
  }, [lectures])
  return (
    <>
      {lectures.length > 0 ? (
        <div>
          <LectureBox />
          <div>{lectures && lectures.map((lecture, index) => <LectureItem item={lecture} key={index} type="icon" />)}</div>
        </div>
      ) : (
        <DexyAppView>강의를 준비중입니다</DexyAppView>
      )}
    </>
  )
}

export default EvasShowLectures

const getLectues = (category: ForGetLectures | string) => {
  let result: Lecture[] = []

  switch (category) {
    case "engneKim":
      return (result = engNeKim)
    default:
      return result
  }
}
