const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook, onRemoveBook }) {
    return (
        <article className="book-preview">
            <div>
                {book.listPrice.isOnSale && <div className="ribbon">On Sale!</div>}
                <img src={book.thumbnail} alt="" />
            </div>
            <h3>{book.title.toUpperCase()}</h3>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <div className="btn-continaer">
                <button><Link to={`/books/edit/${book.id}`}>Edit</Link></button>
                <button><Link to={`/books/${book.id}`}>Details</Link></button>
                <button onClick={() => onRemoveBook(book.id)}>Delete</button>
            </div>
            
        </article>

    )
}



{/* <article className="book-preview">
<div>
{book.listPrice.isOnSale && <div className="ribbon">On Sale!</div>}
<img src={book.thumbnail} alt="" />
</div>
<h3>{book.title.toUpperCase()}</h3>
<p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
<div className="btn-continaer">
<button onClick={() => onRemoveBook(book.id)}>Delete</button>
<button onClick={() => onSelectBook(book.id)}>Details</button>
</div>
</article> */}