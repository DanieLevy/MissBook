import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { LongTxt } from "../cmps/long-text.jsx"

const { getCurrencyIcon } = utilService
// add support for getting the book id from the route params (url)
const { useNavigate, useParams, Outlet, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
  const [book, setBook] = useState(null)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    loadBook()
  }, [])

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    const id = params.bookId
    bookService.get(id).then((book) => {
      setBook(book)
    })
  }

  function onBack() {
    navigate("/books")
  }

  function getPriceClass() {
    return book.listPrice.amount > 150
      ? "red"
      : book.listPrice.amount < 20
      ? "green"
      : ""
  }

  function getReadingTime() {
    return book.pageCount > 500
      ? "Serious Reading"
      : book.pageCount > 200
      ? "Descent Reading"
      : "Light Reading"
  }

  function getPublishedDate() {
    return book.publishedDate > 10 ? "Vintage Book" : "New Book"
  }

  if (!book) return <div>Loading...</div>

  return (
    <React.Fragment>
      <section className="book-details">
        <div>
          {book.listPrice.isOnSale && <div className="ribbon">On Sale!</div>}
          <img src={book.thumbnail} alt="" />
        </div>
        <div>
          <h2>{book.title}</h2>

          <p>
            <span className="bold">Price: </span>
            <span className={getPriceClass()}>
              {getCurrencyIcon(book.listPrice.currencyCode)}
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </span>
          </p>
          <p>
            <span className="bold">Reading Time: </span>
            {book.pageCount} pages (
            <span className="bold">{getReadingTime()}</span>)
          </p>
          <p>
            <span className="bold">Published Date: </span>
            {book.publishedDate} ({getPublishedDate()})
          </p>
          <p>
            <span className="bold">Categories: </span>
            {book.categories.join(", ")}
          </p>
          <p>
            <span className="bold">Authors: </span>

            {book.authors.map((author, idx) => (
              <span key={idx}>{author} </span>
            ))}
          </p>
          <p>
            <span className="bold">Language: </span>
            {book.language}
          </p>
          <p>
            <span className="bold">Description: </span>
            <LongTxt txt={book.description} />
          </p>
          <Link to={`/books/${book.id}/add-review`}>Add Review</Link>
          <button onClick={onBack}>Back</button>

          <div>
            <Outlet />
          </div>
          
        </div>
      </section>
    </React.Fragment>
  )
}
