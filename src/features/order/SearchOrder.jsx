import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/order/${query}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Serach Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}



export default SearchOrder;