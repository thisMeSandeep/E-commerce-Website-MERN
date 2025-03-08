import ProductsList from "../components/shop/ProductsList"
import SideBar from "../components/shop/SideBar"
import BreadCrumbs from "../components/commonComponents/BreadCrumbs"

const ShopPage = () => {
  return (
    <div className="relative">
      <BreadCrumbs />

      <div className="container flex items-start mt-5 h-screen ">
        <SideBar />
        <ProductsList />
      </div>
    </div>
  )
}

export default ShopPage