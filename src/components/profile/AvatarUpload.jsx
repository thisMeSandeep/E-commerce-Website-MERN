import { assets } from "../../assets/assets"
import userDummyImage from "../../assets/userDummy.png"
const AvatarUpload = () => {
  return (
    <form>
      <label htmlFor="upload" className="relative">
        <img src={userDummyImage} alt="user dummy image" className="size-32 rounded-full object-cover cursor-pointer" />
        <img src={assets.upload_area} alt="upload" className="absolute size-12 rounded-full top-[50%] left-[50%]" />
      </label>
      <input type="file" id="upload" className="hidden" />
    </form>
  )
}

export default AvatarUpload