import ElectronicsProducts from "../components/home/ElectronicsProducts"
import HeroSlider from "../components/home/HeroSlider"
import PopularProducts from "../components/home/PopularProducts"


const HomePage = () => {
  return (
    <section className="container mt-5">
      <HeroSlider />
      <PopularProducts />
      <ElectronicsProducts />
    </section>
  )
}

export default HomePage