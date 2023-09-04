const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  console.log("filterBuuuy", filterBy)
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    console.log("field", field)
    const value = target.type === "checkbox" ? target.checked : target.value
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  return (
      <section className="book-filter">
        <h3>Filter By</h3>
        <form onSubmit={onFilter} className="form-container">
          <input
            placeholder="Name?.."
            type="text"
            id="title"
            name="title"
            value={filterByToEdit.title}
            onChange={handleChange}
          />
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filterByToEdit.minPrice}
            onChange={handleChange}
          />

          <label htmlFor="onSale">On Sale?</label>
          <input
            type="checkbox"
            id="onSale"
            name="onSale"
            value={filterByToEdit.onSale}
            onChange={handleChange}
          />
        </form>
      </section>
  )
}
