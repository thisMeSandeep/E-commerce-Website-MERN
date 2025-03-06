import BreadCrumbs from "../components/commonComponents/BreadCrumbs"
import aboutMain from "../assets/aboutUsMain.png";
import aboutUsBanner from "../assets/aboutBanner.png";

const AboutPage = () => {
  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <div className="container my-10">
        {/* upper section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center">
          <div>
            <p className="bg-blue-500 inline-block text-white px-5 py-2 text-center uppercase tracking-tighter">who we are</p>
            <h1 className="mt-5 text-3xl font-bold text-gray-800">DropCart-Largest multi-product retail shop in the world</h1>
            <p className="mt-5 text-gray-600 text-sm ">At <span>DropCart</span>, we don’t just sell products—we bring experiences to life. Our journey began with a simple vision: to create a shopping destination where quality meets convenience. From carefully curated collections to seamless customer service, we strive to make every purchase special. Whether you're here for the latest trends or timeless classics, we’re dedicated to bringing you the best. Join us on this journey, and let’s make shopping exciting, effortless, and unforgettable!</p>
          </div>

          <img src={aboutMain} alt="about" className=" size-[300px] md:size-[400px] object-cover" />
        </div>
        {/* upper section ends here */}
      </div>

      {/* banner section */}
      <div
        className="mt-20 w-full  h-[300px] b bg-no-repeat bg-cover  lg:bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${aboutUsBanner})` }}
      >
        <span className=" w-full md:w-6/12 lg:w-4/12 ml-10 px-2">
          <h2 className="text-3xl text-gray-900 font-bold tracking-tighter">Your trusted and relaible retail store</h2>
          <p className="text-gray-700 mt-5 tracking-tighter text-wrap">We promise the fastest delivery to your doorstep.
            Enjoy a seamless shopping experience with high-quality products, secure payments, and exceptional customer support.
            Your satisfaction is our priority, and we’re here to make every order smooth and hassle-free. Thank you for choosing us!</p>
        </span>
      </div>

    </div >
  )
}

export default AboutPage