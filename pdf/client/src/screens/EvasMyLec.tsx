import React, { SetStateAction, useEffect, useState } from "react"
import { DexyAppView, DexyIcon } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { IoOptionsOutline } from "react-icons/io5"
import { getRemaingDays } from "../redux/reducers/userSlice"
import { mylec } from "../styles"
import { useStateContext } from "../contextApi/StateProvider"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../redux/store"
import { liftHandler } from "../redux/reducers/lifter"

const EvasMyLec = () => {
  const { user, sample } = useAppSelector((state) => state)
  const [lectures, setLectures] = useState<MyLecture[]>([])
  const [sorts, setSorts] = useState<EvasFilter[]>([])
  const [filter, setFilter] = useState<EvasFilter | undefined>(undefined)

  const changeFilter = (name: EvasFilter) => setFilter(name)

  const navi = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    let copy: MyLecture[] = []
    let forSort: EvasFilter[] = []
    user.lectures &&
      user.lectures.map((item) => {
        copy = [...copy, { ...item, remaining: getRemaingDays(item.expiresIn, item.purchasedAt) }]

        let sort: EvasFilter = item.book
        if (item.category) {
          sort = `${item.category} ${item.book}`
        }
        const isRedundent = forSort.find((target) => target === sort)
        return isRedundent ? forSort : (forSort = [...forSort, sort])
      })
    setLectures(copy)
    setSorts(forSort)
  }, [user.lectures])

  return (
    <>
      {lectures && lectures.length > 0 ? (
        <>
          <Filter sorts={sorts} changeFilter={changeFilter} />
          <Lectures dispatch={dispatch} filter={filter} lectures={lectures} sorts={sorts} navi={navi} />
        </>
      ) : (
        <DexyAppView>결제하신 강의가 없습니다.</DexyAppView>
      )}
    </>
  )
}

export default EvasMyLec

const Lectures = (props: { lectures: MyLecture[]; sorts: EvasFilter[]; filter: EvasFilter | undefined; navi: any; dispatch: AppDispatch }) => {
  const { lectures, sorts, filter, navi, dispatch } = props

  return (
    <>
      {sorts &&
        sorts.map((sort, index) => {
          if (filter) {
            if (filter === sort) {
              return <LectureItem dispatch={dispatch} navi={navi} key={index} lectures={lectures} sort={sort} filter={filter} />
            }
          } else return <LectureItem dispatch={dispatch} navi={navi} key={index} lectures={lectures} sort={sort} filter={filter} />
        })}
    </>
  )
}

const LectureItem = (props: { lectures: MyLecture[]; sort: EvasFilter; filter?: EvasFilter; navi: any; dispatch: AppDispatch }) => {
  const { lectures, sort, filter, navi, dispatch } = props
  const { screen } = useStateContext()
  const [width, setWidth] = useState("")
  useEffect(() => {
    let screenWidth = "25%"
    if (screen.width < 400) screenWidth = "25%"
    if (screen.width >= 400) screenWidth = "20%"
    if (screen.width >= 768) screenWidth = "10%"
    setWidth(screenWidth)
  }, [screen])

  const onClick = (lecture: MyLecture) => {
    let fullName = `${lecture.sort} ${lecture.book} ${lecture.chapter}`
    if (lecture.category) fullName = `${lecture.sort} ${lecture.category} ${lecture.book} ${lecture.chapter}`
    dispatch(liftHandler(lecture))
    navi(`/evas/myLec/lectures/${fullName}`)
  }
  return (
    <div style={mylec.lContainer}>
      <div style={mylec.lFilterName}>{filter ? filter : sort}</div>
      {lectures &&
        lectures.map((lecture) => {
          let filter: EvasFilter | string = lecture.book
          if (lecture.category) filter = `${lecture.category} ${lecture.book}`
          if (filter === sort) {
            if (lecture.icon) {
              if (lecture.remaining > -1)
                return (
                  <div key={lecture.id} style={{ ...mylec.lItem, width }} onClick={() => onClick(lecture)}>
                    <DexyIcon name={lecture.chapter} src={lecture.icon} option={lecture.remaining} />
                  </div>
                )
            }
          }
        })}
    </div>
  )
}

const Filter = (props: { changeFilter: (name: EvasFilter) => void; sorts: EvasFilter[] }) => {
  const { changeFilter, sorts } = props
  return (
    <div>
      <button onClick={() => changeFilter("")}>전체 강의</button>
      {sorts &&
        sorts.map((sort, index) => (
          <button
            key={index}
            onClick={() => {
              console.log(sort)
              changeFilter(sort)
            }}>
            {sort}
          </button>
        ))}
    </div>
  )
}
