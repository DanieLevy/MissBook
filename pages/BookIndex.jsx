const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { BookDetails } from "./BookDetails.jsx"


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

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    console.log(selectedBook, 'selectedBookkkkkkkkkkkkkkkkk');

    // console.log(bookService.getDefaultFilter(), 'getDefaultFilter()');
    // console.log('filterBy', filterBy);
    // console.log('books', books);
    // console.log('selectedBook', selectedBook);
    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onSetFilter(filterBy) {
        console.log('filterBy', filterBy);
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSelectBook(book) {
        setSelectedBook(book)
    }

    function onBack() {
        setSelectedBook(null)
    }

    
    if (!books) return <div>Loading...</div>

    // TODO: Create card for each book 
    // console.log('booksBefore', books);
    return (
        <section className="book-index">
            {!selectedBook &&
            <React.Fragment>
                <h2>Book Index</h2>
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <BookList books={books} onSelectBook={setSelectedBook} />
            </React.Fragment>}

            {selectedBook && 
            <div className="details-container">
            <BookDetails book={(selectedBook)} onBack={() => onSelectBook(null)} />
            </div>}
        </section>
    )
}
