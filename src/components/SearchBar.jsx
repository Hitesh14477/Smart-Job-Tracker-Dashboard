function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search by company or role..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default SearchBar
