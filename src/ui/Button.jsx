import { Link } from "react-router-dom"

function Button({ children, disabled, to, type, onClick }) {

  const base = "font-semibold text-stone-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300 tracking-wide uppercase rounded-full focus: outline-none focus:ring focus: ring-yellow-300 focus: ring-offset-2"

  const style = {
    primary: base + " py-3 px-4 md:px-6 md:py-4",
    small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs",
    secondary: "font-semibold text-stone-700 hover:bg-stone-200 border-4 border-stone-200 transition-colors duration-300 tracking-wide uppercase rounded-full focus: outline-none focus:ring focus: ring-yellow-300 focus: ring-offset-2 py-2 px-4 md:px6 md:py-4 hover:text-stone-900",
    round: base + "py-1 px-2 text-sm md:py-2 md:px-4",
  }

  if (to) return (
    <Link to={to} className={style[type]}>{children}</Link>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={style[type]} disabled={disabled}>
        {children}
      </button>
    )
  }
  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button