const { link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>MissBook</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}