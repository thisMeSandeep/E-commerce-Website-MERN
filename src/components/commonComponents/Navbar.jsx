import Search from "./Search"
import { assets } from "../../assets/assets"

const Navbar = () => {
  return (
    <header className="">
      <nav className="">
        {/* logo */}
        <div>
          <img src={assets.logo} alt="" />
        </div>

        {/* search bar */}
        <Search />

        {/* Navlinks */}
        <ul>

        </ul>


        {/* profile */}
        <div></div>

      </nav>
    </header>
  )
}

export default Navbar 