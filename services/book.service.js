import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = "booksDB"
var gFilterBy = { title: "", amount: 0, isOnSale: false }
_createBooks()

// example for book model:
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

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.isOnSale) {
      books = books.filter((book) => book.listPrice.isOnSale)
    }
    if (gFilterBy.amount) {
      books = books.filter((book) => book.listPrice.amount <= gFilterBy.amount)
    }
    if (gFilterBy.title) {
      books = books.filter((book) => book.title.includes(gFilterBy.title))
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(listPrice = { amount: 0, isOnSale: false }) {
  return {
    title: "",
    description: "",
    listPrice,
    thumbnail: "",
  }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.amount !== undefined) gFilterBy.amount = filterBy.amount
  if (filterBy.isOnSale !== undefined) gFilterBy.isOnSale = filterBy.isOnSale

  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    const idx = books.findIndex((book) => book.id === bookId)
    return idx === books.length - 1 ? books[0].id : books[idx + 1].id
  })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    books.push(_createBook("Harry Potter", 100))
    books.push(_createBook("The Hobbit", 200))
    books.push(_createBook("The Lord of the Rings", 300))
    books.push(_createBook("The Hunger Games", 400))
    books.push(_createBook("The Da Vinci Code", 500))
    books.push(_createBook("The Catcher in the Rye", 600))
    books.push(_createBook("The Great Gatsby", 700))
    books.push(_createBook("The Lion, the Witch and the Wardrobe", 800))

    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount) {
  return {
    id: utilService.makeId(),
    title,
    listPrice: {
      amount,
      isOnSale: false,
    },
    // get random number bewtween 1-20 to set the image
    thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomInt(
      1,
      20
    )}.jpg`,
  }
}
