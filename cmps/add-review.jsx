import { bookService } from "../services/book-service.js"
import { utilService } from "../services/util-service.js"
// get the book id from the route params (url)

const { Link, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function AddReview() {
  const params = useParams()
  const [book, setBook] = useState(null)
    const [rating, setRating] = useState(0)

  const [review, setReview] = useState({
    fullName: "",
    readAt: "",
    star: "",
  })

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

  function onInputChange(ev) {
    const { name, value } = ev.target;
  
    if (name === 'rating') {
      setRating(value) 
    } else {
      setReview(prevReview => ({
        ...prevReview,
        [name]: value
      }));
    }
  }

    function onAddReview(ev) {
        ev.preventDefault()
        console.log('review', review);
        // bookService.addReview(book.id, review)
    }

  if (!book) return <div>Loading...</div>
  // as stars and review date
  return (
    <section className="add-review">
        <h1>Add Review</h1>
        <form onSubmit={onAddReview}>
            <label htmlFor="review">Review:</label>
            <div className="stars">
                <input
                    className="star star-5"
                    id="star-5"
                    type="radio"
                    name="star"
                    onChange={onInputChange}
                    value={5}
                />
                <label className="star star-5" htmlFor="star-5"></label>
                <input
                    className="star star-4"
                    id="star-4"
                    type="radio"
                    name="star"
                    onChange={onInputChange}
                    value={4}
                />
                <label className="star star-4" htmlFor="star-4"></label>
                <input
                    className="star star-3"
                    id="star-3"
                    type="radio"
                    name="star"
                    onChange={onInputChange}
                    value={3}
                />
                <label className="star star-3" htmlFor="star-3"></label>
                <input
                    className="star star-2"
                    id="star-2"
                    type="radio"
                    name="star"
                    onChange={onInputChange}
                    value={2}
                />
                <label className="star star-2" htmlFor="star-2"></label>
                <input
                    className="star star-1"
                    id="star-1"
                    type="radio"
                    name="star"
                    onChange={onInputChange}
                    value={1}
                />
                <label className="star star-1" htmlFor="star-1"></label>
            </div>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" name="fullName" id="fullName" onChange={onInputChange} />
            <label htmlFor="readAt">Read At:</label>
            <input type="date" name="readAt" id="readAt" onChange={onInputChange} />
            <button>Submit</button>
        </form>
    </section>
  )
}

{/* <section className="add-review">
<h1>Add Review</h1>
<form onSubmit={onAddReview}>
  <label htmlFor="review">Review:</label>
  <div className="stars">
    <input
      className="star star-5"
      id="star-5"
      type="radio"
      name="star"
      onChange={onInputChange}
    />
    <label className="star star-5" htmlFor="star-5"></label>
    <input
      className="star star-4"
      id="star-4"
      type="radio"
      name="star"
      onChange={onInputChange}
    />
    <label className="star star-4" htmlFor="star-4"></label>
    <input
      className="star star-3"
      id="star-3"
      type="radio"
      name="star"
      onChange={onInputChange}
    />
    <label className="star star-3" htmlFor="star-3"></label>
    <input
      className="star star-2"
      id="star-2"
      type="radio"
      name="star"
      onChange={onInputChange}
    />
    <label className="star star-2" htmlFor="star-2"></label>
    <input
      className="star star-1"
      id="star-1"
      type="radio"
      name="star"
      onChange={onInputChange}
    />
    <label className="star star-1" htmlFor="star-1"></label>
  </div>
  <label htmlFor="review">Full Name:</label>
  <input type="text" name="review" id="review" onChange={onInputChange} />
  <label htmlFor="review">Read At:</label>
  <input type="date" name="review" id="review" onChange={onInputChange} />
  <button>Submit</button>
</form>
</section> */}