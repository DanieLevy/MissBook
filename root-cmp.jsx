const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { About } from "./pages/About.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function App() {
  const [page, setPage] = useState("home")

  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookIndex />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/books/edit" element={<BookEdit />} />
            <Route path="/books/edit/:bookId" element={<BookEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
