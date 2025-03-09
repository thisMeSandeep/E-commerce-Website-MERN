import ProductsList from "../components/shop/ProductsList"
import SideBar from "../components/shop/SideBar"
import BreadCrumbs from "../components/commonComponents/BreadCrumbs"

const ShopPage = () => {
  return (
    <div className="relative">
      <BreadCrumbs />

      <div className="container  lg:flex items-start gap-5 mt-5 overflow-x-hidden  ">
        <div className="w-[300px] ">
          <SideBar />
        </div>
        <div className="w-full">
          <ProductsList />
        </div>
      </div>
    </div>
  )
}

export default ShopPage