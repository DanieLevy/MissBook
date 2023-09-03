import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails(props) {
  const bookId = props.book
  const onBack = props.onBack

  const [book, setBook] = useState(null)

  useEffect(() => {
    bookService.get(bookId).then((book) => setBook(book))
  }, [])

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
       <span className='bold'>
         Price:{" "}
        </span>
        <span
          className={
              book.listPrice.amount > 150
              ? "red"
              : book.listPrice.amount < 20
              ? "green"
              : ""
          }
        >
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </span>
      </p>
      <p>
        <span className='bold'>
            Reading Time:{" "}
        </span>
        
         {book.pageCount} {" "} pages (
        {book.pageCount > 500
          ? "Serious Reading"
          : book.pageCount > 200
          ? "Descent Reading"
          : "Light Reading"}
        )
      </p>
      <p>
        <span className='bold'>
            Published Date:{" "}
        </span>

        {book.publishedDate} (
        {book.publishedDate > 10 ? "Vintage" : "New"})
      </p>
      <p>
        <span className='bold'>
            Categories:{" "}
        </span>
        {book.categories.map((category, idx) => (
            <span key={idx}>{category} </span>
            ))}
      </p>
      <p>
        <span className='bold'>
            Authors:{" "}
        </span>

        {book.authors.map((author, idx) => (
            <span key={idx}>{author} </span>
            ))}
      </p>
      <p>
        <span className='bold'>
            Description:{" "}
        </span>

         {book.description}</p>
      <button onClick={onBack}>Back</button>
            </div>
    </section>
    </React.Fragment>
  )
}
