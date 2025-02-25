import ElectronicsProducts from "../components/home/ElectronicsProducts"
import HeroSlider from "../components/home/HeroSlider"
import PopularProducts from "../components/home/PopularProducts"
import ExploreCategories from "../components/home/ExploreCategories"
import FeaturedProducts from "../components/home/FeaturedProducts"
import Gaming from "../components/home/Gaming"
import Newsletter from "../components/commonComponents/Newletter"


const HomePage = () => {
  return (
    <section className="container mt-5">
      <HeroSlider />
      <PopularProducts />
      <ElectronicsProducts />
      <ExploreCategories />
      <FeaturedProducts />
      <Gaming />
      <Newsletter />
    </section>
  )
}

export default HomePage