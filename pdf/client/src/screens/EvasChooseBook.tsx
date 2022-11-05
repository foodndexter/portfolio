import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { DexyAppView, DexyIcon } from "../components"
import { eng, gdns, go, megs, psmb, sntg } from "../dexybase"
import { dexyStyle } from "../styles"

const EvasChooseBook = () => {
  const { sort } = useParams()
  const [category, setCategory] = useState<CategoryList[]>([])
  useEffect(() => {
    if (sort) {
      if (sort === "gdns" || sort === "megs") {
        setCategory(getCategory(sort))
      } else setBooks(getBooks(sort))
    }
  }, [sort])

  const [books, setBooks] = useState<BookList[]>([])
  const navi = useNavigate()

  useEffect(() => {
    console.log(books)
  }, [books])

  return (
    <DexyAppView>
      {sort === "gdns" || sort === "megs" ? <ChooseCategory sort={sort} category={category} navi={navi} /> : sort && <ChooseBook books={books} navi={navi} />}
    </DexyAppView>
  )
}

export default EvasChooseBook

const ChooseCategory = (props: { sort: string; category: CategoryList[]; navi: any }) => {
  const { category, navi } = props
  const [isCategoryChosen, setIsCategoryChosen] = useState(false)

  const [books, setBooks] = useState<BookList[]>([])

  const [chosenCategory, setChosenCategory] = useState<Category>("eng")

  const onClick = (item: CategoryList) => {
    // console.log(item.name, pathname)
    setChosenCategory(item.path)
    setIsCategoryChosen(true)
    setBooks(getBooks(item.path))
  }

  useEffect(() => {
    console.log(books)
  }, [books])

  return (
    <>
      {isCategoryChosen ? (
        <ChooseBook books={books} navi={navi} category={chosenCategory} />
      ) : (
        <div style={{ ...dexyStyle.btnWrap }}>
          {category &&
            category.map((item, index) => <DexyIcon key={index} name={item.name} onClick={() => onClick(item)} src={item.icon} style={{ margin: "0 10px" }} />)}
        </div>
      )}
    </>
  )
}

const ChooseBook = (props: { books: BookList[]; navi: any; category?: Category }) => {
  const { books, navi, category } = props

  const { pathname } = useLocation()

  const onClick = (book: BookList) => {
    const path = category ? `${pathname}/${category}${book.path}` : `${pathname}/${book.path}`
    console.log(`${path}`)
    navi(`${path}`)
  }

  return (
    <>
      {books.length > 0 ? (
        <div style={dexyStyle.btnWrap}>
          {books &&
            books.map((book, index) => <DexyIcon key={index} name={book.name} onClick={() => onClick(book)} src={book.icon} style={{ margin: "0 10px" }} />)}
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  )
}

const getCategory = (sort: Sort) => {
  let result: CategoryList[] = []
  switch (sort) {
    case "gdns":
      return (result = gdns)
    case "megs":
      return (result = megs)
  }
  return result
}

const getBooks = (sort: Sort | Category | string) => {
  console.log("target:", sort)
  let result: BookList[] = []
  switch (sort) {
    case "sntg":
      return (result = sntg)
    case "psmb":
      return (result = psmb)
    case "eng":
      return (result = eng)
    case "engI":
      return (result = eng)
    case "engII":
      return (result = eng)
    case "go1":
      return (result = go)
    case "go2":
      return (result = go)
  }
  return result
}
