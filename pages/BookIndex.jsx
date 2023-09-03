const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

// {
//     "id": "OXeMG8wNskc",
//     "title": "metus hendrerit",
//     "description": "placerat nisi sodales suscipit tellus",
//     "thumbnail": “http://coding-academy.org/books-photos/
//    20.jpg",
//     "listPrice": {
//     "amount": 109,
//     "currencyCode": "EUR",
//     "isOnSale": false
//     }
//     }

export function BookIndex() {

    // import all the books from the service
    const [books, setBooks] = useState([])
    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
    }, [])

    
    if (!books) return <div>Loading...</div>

    return (
        <section>
            <h2>Book Index</h2>
            <ul>
                {books.map(book => <li key={book.id}>{book.title}</li>)}
            </ul>
        </section>
    )
}
