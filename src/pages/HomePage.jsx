import ElectronicsProducts from "../components/home/ElectronicsProducts"
import HeroSlider from "../components/home/HeroSlider"
import PopularProducts from "../components/home/PopularProducts"
import ExploreCategories from "../components/home/ExploreCategories"
import FeaturedProducts from "../components/home/FeaturedProducts"


const HomePage = () => {
  return (
    <section className="container mt-5">
      <HeroSlider />
      <PopularProducts />
      <ElectronicsProducts />
      <ExploreCategories />
      <FeaturedProducts />
    </section>
  )
}

export default HomePage