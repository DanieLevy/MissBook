// book list

import { BookPreview } from "./book-preview.jsx"

export function BookList({ books, onSelectBook }) {
    return (
        <section className="books-container">
            {books.map(book =>
            <BookPreview key={book.id} book={book} onSelectBook={onSelectBook} />)}
        </section>
    )
}