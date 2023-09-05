// book list

import { BookPreview } from "./book-preview.jsx"
const { Link } = ReactRouterDOM
// supoort getting the id from the route params (url)
const { useNavigate, useParams } = ReactRouterDOM

export function BookList({ books, onSelectBook, onRemoveBook, onAddBook }) {

    return (
        <section className="books-container">
                {books.map((book) => (
                    <BookPreview
                        key={book.id}
                        book={book}   
                        onSelectBook={onSelectBook} 
                        onRemoveBook={onRemoveBook} 
                        onAddBook={onAddBook} 
                    />  
                ))}
        </section>
    )
}
