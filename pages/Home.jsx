// design the home page
export function Home() {
    return (
        <section>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <article>
                <h2>What is this?</h2>
                <p>This is a simple React app that uses React Router to navigate between pages.</p>
                <p>It is a single page application (SPA) that uses the browser's history API to change the URL in the address bar without reloading the page.</p>
                <p>It uses the <a href="https://reactrouter.com/web/guides/quick-start" target="_blank" rel="noreferrer">React Router</a> library to handle routing.</p>
            </article>
        </section>
    )
}