import { Link } from "react-router-dom"

function Button({ children, disabled, to }) {
  const className = "py-3 px-4 font-semibold text-stone-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300 tracking-wide uppercase rounded-full focus: outline-none focus:ring focus: ring-yellow-300 focus: ring-offset-2 sm:px-6 sm:py-4"

  if (to) return (
    <Link to={to} className={className}>{children}</Link>
  )

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button