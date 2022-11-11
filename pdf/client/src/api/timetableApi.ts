import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { SetStateAction } from "react"
import { studentList, time_table, classList } from "../dexybase/attendency"
import { db, dbService } from "../firebase"

export const addTT = async (day: Days, data: Schedule) => {
  const result = await dbService.collection(day).add({
    data,
  })
  console.log(result)
}

export const patchAttendency = async () => {
  const timetable = time_table

  const docRef = doc(db, "attendency", "Zf5dFEKqXxwMNd8NEFeg")
  await setDoc(docRef, { studentList, timetable, classList }, { merge: true }).then((res) => console.log(res))
}

export const fetchAttendency = async (set: SetStateAction<any>) => {
  let attendency
  const result = await dbService.collection("attendency").onSnapshot((snap) => {
    attendency = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    set(attendency)
  })
  return true
}

export const updateStatus = async (studentList: AStudent[]) => {
  const docRef = doc(db, "attendency", "Zf5dFEKqXxwMNd8NEFeg")
  await setDoc(docRef, { studentList }, { merge: true }).then((res) => console.log(res))
}
