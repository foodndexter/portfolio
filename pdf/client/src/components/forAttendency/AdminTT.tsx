import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { AButton, ASelect, DexyButtonWrap } from "./AttendecyNodes"
import { AiOutlineEdit, AiOutlineCheckCircle } from "react-icons/ai"
import { RiDeleteBack2Line } from "react-icons/ri"
import { classList, timeList } from "../../dexybase/attendency"

const AdminTT = (props: { timetable: TimeTable[]; color: string }) => {
  const { timetable, color } = props

  const [options, setOptions] = useState<Days[]>([])

  const [day, setDay] = useState<Days>("")

  useEffect(() => {
    let option: Days[] = []
    timetable &&
      timetable.map((item) => {
        option = [...option, item.day]
      })
    setOptions(option)
  }, [timetable])

  const dispatch = useAppDispatch()
  const onClick = (day: Days) => setDay(day)
  return (
    <>
      <DexyButtonWrap>
        {options &&
          options.map((option) => (
            <AButton key={option} onClick={() => onClick(option)} border={option === day ? false : true} width="100%" margin={5}>
              {option}
            </AButton>
          ))}
      </DexyButtonWrap>
      <DexyButtonWrap flexDirection="column" margin={5}>
        {timetable && timetable.map((item) => (item.day === day ? <Schedules schedule={item.schedule} key={item.day} color={color} /> : null))}
      </DexyButtonWrap>
    </>
  )
}

export default AdminTT

const Schedules = (props: { schedule: Schedule[]; color: string }) => {
  const [schedule, setSchedule] = useState<Schedule[]>([])

  useEffect(() => {
    setSchedule(props.schedule)
  }, [props.schedule])

  return (
    <>
      {schedule && schedule.map((item) => <ScheduleItem key={item.time} item={item} color={props.color} />)}
      <button>추가</button>
    </>
  )
}

const ScheduleItem = (props: { item: Schedule; color: string }) => {
  const { item, color } = props
  const [input, setInput] = useState<Schedule>({ time: "", class: "" })

  useEffect(() => {
    setInput({ time: item.time, class: item.class })
  }, [item])

  const onChange = (e: any) => {
    const { value, name } = e.target
    setInput({ ...input, [name]: value })
  }

  const [isEditting, setIsEditting] = useState(false)

  const onEdit = () => {
    setIsEditting((prev) => !prev)
    isEditting && console.log("editting done")
  }

  const Button = styled("button", {
    color,
  })

  const InputWrap = styled("div", {
    display: "flex",
    alignItems: "center",
  })

  const Input = styled("input", {
    border: "none",
    color,
    borderBottom: "1px solid",
    "&:focus": {
      outline: "none",
    },
    height: 45,
    backgroundColor: "transparent",
    marginBottom: 3,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    width: "100%",
    textAlign: "center",
  })

  const ButtonWrap = styled("div", {
    display: "flex",
    alignItems: "center",
  })

  return (
    <Item>
      <InputWrap>
        {isEditting ? (
          <>
            <ASelect options={timeList} name="time" onChange={onChange} placeHolder="시간을 선택해주세요." value={input.time} />
            <ASelect placeHolder="반을 선택해주세요." options={classList} value={input.class} onChange={onChange} name="class" />
          </>
        ) : (
          <>
            <span>{item.time}</span>
            <span>{item.class}</span>
          </>
        )}
      </InputWrap>
      <ButtonWrap>
        <Button style={{ marginRight: 10 }} onClick={onEdit}>
          {isEditting ? <AiOutlineCheckCircle size={20} /> : <AiOutlineEdit size={20} />}
        </Button>
        <Button>
          <RiDeleteBack2Line size={20} />
        </Button>
      </ButtonWrap>
    </Item>
  )
}
const Item = styled("div", {
  display: "flex",
  border: "1px solid",
  width: "calc(100% - 30px)",
  borderRadius: 3,
  height: 30,
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  marginBottom: 10,
})
