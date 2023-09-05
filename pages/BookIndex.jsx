const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    bookService.query(filterBy).then((books) => setBooks(books))
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
    })
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <Link to="/books/edit">Add Book</Link>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
  }