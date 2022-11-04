import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const EvasChooseBook = () => {
  const { sort } = useParams()

  useEffect(() => {
    if (sort === "gdns" || sort === "megs") {
      console.log(getCategory(sort))
    }
  }, [sort])

  const [books, setBooks] = useState([])
  return <div>{sort === "gdns" || sort === "megs" ? <ChooseCategory sort={sort} /> : sort && <ChooseBook />}</div>
}

export default EvasChooseBook

const ChooseCategory = (props: { sort: string }) => {
  const [isCategoryChosen, setIsCategoryChosen] = useState(false)

  return <>{isCategoryChosen ? <ChooseBook /> : <>Choose Category</>}</>
}

const ChooseBook = (props: {}) => {
  return <>Choose Book</>
}

const getCategory = (sort: Sort) => {
  let result: CategoryList[] = []
  switch (sort) {
    case "gdns":
      return (result = [])
    case "megs":
      return (result = [])
  }
  return result
}

const getBooks = () => {}
