const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    bookService.query(filterBy).then((books) => setBooks(books))
  }, [filterBy])

  function onSetFilter(filterBy) {
    console.log("filterBy", filterBy)
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  function onSelectBook(book) {
    setSelectedBook(book)
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
    })
  }

  function onAddBook(book) {
    bookService.add(book).then((addedBook) => {
      setBooks((prevBooks) => [...prevBooks, addedBook])
    })
  }

  if (!books) return <div>Loading...</div>

  // TODO: Create card for each book
  // console.log('booksBefore', books);
  return (
    <section className="book-index">
      {!selectedBook && (
        <React.Fragment>
          <h2>Book Index</h2>
          <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          <BookList
            books={books}
            onSelectBook={setSelectedBook}
            onRemoveBook={onRemoveBook}
            onAddBook={onAddBook}
          />
        </React.Fragment>
      )}

      {selectedBook && (
        <div className="details-container">
          <BookDetails book={selectedBook} onBack={() => onSelectBook(null)} />
        </div>
      )}
    </section>
  )
}
