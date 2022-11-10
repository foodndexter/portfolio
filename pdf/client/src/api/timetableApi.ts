import { collection, addDoc } from "firebase/firestore"
import { dbService } from "../firebase"

export const addTT = async (day: Days, data: Schedule) => {
  const result = await dbService.collection(day).add({
    data,
  })
  console.log(result)
}
