import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-28
          text-sm 
          sm:w-56
          px-3 py-2 
          rounded-full 
          bg-yellow-100 
          placeholder:text-stone-500 
          focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-20 sm:focus:w-72 transition-all duration-300
          "
      />
    </form>
  )
}


export default SearchOrder;