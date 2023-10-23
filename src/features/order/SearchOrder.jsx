import { useState } from "react"

function SearchOrder() {
  const [query, setQuery] = useState("");

  // handleSubmit(e) {
  //   e.preventDefault();
  // }

  return (
    <form>
      <input
        type="text"
        placeholder="Serach Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchOrder;