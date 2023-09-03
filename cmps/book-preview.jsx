

export function BookPreview({ book, onSelectBook }) {
    return (
        <article className="book-preview">
            <div>
            {book.listPrice.isOnSale && <div className="ribbon">On Sale!</div>}
            <img src={book.thumbnail} alt="" />
            </div>
            {/* <h3>{book.title}</h3> */}
            <h3>{book.title.toUpperCase()}</h3>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <button onClick={() => onSelectBook(book.id)}>Details</button>
        </article>
    )
}