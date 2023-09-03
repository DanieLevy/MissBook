const { useState } = React

import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { About } from "./pages/About.jsx"

export function App() {

  const [page, setPage] = useState("home")
  
  return (
    <section className="app">
      <header className="app-header">
        <h1>MissBook</h1>
      </header>
      <nav className="app-nav">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("about")}>About</button>
      </nav>
      <main className="container">
        {page === "home" && <Home />}
        {page === "books" && <BookIndex />}
        {page === "about" && <About />}
      </main>
    </section>
  )
}
