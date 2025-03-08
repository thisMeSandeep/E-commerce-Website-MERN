import ElectronicsProducts from "../components/home/ElectronicsProducts"
import HeroSlider from "../components/home/HeroSlider"
import PopularProducts from "../components/home/PopularProducts"
import ExploreCategories from "../components/home/ExploreCategories"
import FeaturedProducts from "../components/home/FeaturedProducts"
import Gaming from "../components/home/Gaming"
import Newsletter from "../components/commonComponents/Newletter"
import FreeShipping from "../components/home/FreeShipping"
import LatestProducts from "../components/home/LatestProducts"
import Bikes from "../components/home/Bikes"


const HomePage = () => {
  return (
    <section className="container mt-8">
      <HeroSlider />
      <PopularProducts />
      <LatestProducts />
      <ElectronicsProducts />
      <Bikes />
      <ExploreCategories />
      <FreeShipping />
      <FeaturedProducts />
      <Gaming />
      <Newsletter />
    </section>
  )
}

export default HomePage