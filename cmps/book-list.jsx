// book list

import { BookPreview } from "./book-preview.jsx"

export function BookList({ books, onSelectBook, onRemoveBook, onAddBook }) {

    return (
    <React.Fragment>
    <div className="book-add">
    <button onClick={() => onAddBook()}>Add Book</button>
    </div>
    
    <section className="books-container">
      {books.map((book) => (
          <BookPreview
          key={book.id}
          book={book}
          onSelectBook={onSelectBook}
          onRemoveBook={onRemoveBook}
          />
          ))}
    </section>
          </React.Fragment>
  )
}
