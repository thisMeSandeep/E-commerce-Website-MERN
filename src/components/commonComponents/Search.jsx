import { assets } from "../../assets/assets"
const Search = () => {
  return (
    <div className="flex items-center gap-2  shadow rounded-lg px-2 py-1 text-gray-700 flex-1">
      <input type="text" placeholder="Seach for anything " className="focus:outline-none text-gray-700 w-full"/>
      <img src={assets.search_icon} alt="" />
    </div>
  )
}

export default Search