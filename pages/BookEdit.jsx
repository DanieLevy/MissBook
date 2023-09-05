import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) {
      bookService.get(params.bookId).then((book) => {
        setBookToEdit(book)
      })
    }
  }, [])

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit).then(() => {
      navigate("/books")
    })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.type === "checkbox" ? target.checked : target.value

    if (
      field === "isOnSale" ||
      field === "currencyCode" ||
      field === "amount"
    ) {
      setBookToEdit((prevBook) => {
        const newListPrice = { ...prevBook.listPrice }
        newListPrice[field] = value

        return {
          ...prevBook,
          listPrice: newListPrice,
        }
      })
    } else {
      setBookToEdit((prevBook) => ({
        ...prevBook,
        [field]: value,
      }))
    }
  }

  //   if (!bookToEdit) return <div>Loading...</div>

  const { title, amount, description } = bookToEdit
  return (
    <section className="book-edit">
      <h2>Book Edit</h2>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={bookToEdit.listPrice.amount}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <label htmlFor="isOnSale">OnSale</label>
        <input
          type="checkbox"
          id="isOnSale"
          name="isOnSale"
          checked={bookToEdit.listPrice.isOnSale}
          onChange={handleChange}
        />

        <label htmlFor="currencyCode">Currency</label>
        <select
          name="currencyCode"
          id="currencyCode"
          value={bookToEdit.listPrice.currencyCode}
          onChange={handleChange}
        >
          <option value="ILS">ILS</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <button onClick={() => navigate("/books")}>Cancel</button>
        <button>Save</button>
      </form>
    </section>
  )
}
