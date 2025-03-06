import { ArrowRight, Dot, MessageSquare, PhoneCall } from "lucide-react";
import customerCare from "../assets/customer_care.jpg"
import BreadCrumbs from "../components/commonComponents/BreadCrumbs"

const popularTopics = [
  { text: "How do I return my item?", link: "#" },
  { text: "What is Clicon's Returns Policy?", link: "#", highlight: true },
  { text: "How long is the refund process?", link: "#" },
  { text: "What are the Delivery Timelines?", link: "#" },
  { text: "What is Discover Your Daraz Campaign 2022?", link: "#" },
  { text: "What is the Voucher & Gift Offer in this Campaign?", link: "#" },
  { text: "How to cancel Clicon Order?", link: "#" },
  { text: "Ask the Digital and Device Community", link: "#" },
  { text: "How to change my shop name?", link: "#" },
];

const ContactPage = () => {
  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <div className="container mt-10">
        {/* top section */}
        <div className="flex flex-col lg:flex-row items-center justify-center  gap-5">
          <div className="w-full lg:w-1/2">
            <p className="bg-yellow-300 px-8 py-2 rounded-dm inline">help center</p>
            <h1 className=" mt-5 text-2xl lg:text-3xl font-bold text-gray-900">How we can help you</h1>
            <div className=" mt-5 border rounded-sm py-1 px-2 flex items-center gap-2">
              <input type="text" placeholder="Enter your question or question" className="w-full px-2 text-sm focus:outline-none text-gray-600" />
              <button className="bg-orange-500 px-5 py-1 rounded-sm text-white">search</button>
            </div>
          </div>
          <img src={customerCare} alt="customer care" className="w-[300px] md:w-[400px] object-cover" />
        </div>

        {/* popular topics */}
        <h1 className="mt-10 text-3xl font-bold text-gray-900">Popular topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5  place-items-start gap-2 md:gap3 lg:gap-4">
          {popularTopics.map((item, index) => (
            <p key={index} className="text-gray-600 hover:text-gray-900 text-left flex items-center g ap-1"><Dot />{item.text}</p>
          ))}
        </div>

      </div>

      {/* contact us section */}
      <div className="mt-10 flex flex-col items-center justify-center gap-5 bg-gray-200/80 py-10  px-8 md:px-12 lg:px-20">
        <p className="bg-blue-500 px-8 py-2 text-white rounded-sm">Contact us</p>

        <span className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-800 text-nowrap">Don't find your answer.</p>
          <p className="text-2xl font-bold text-gray-800">Contact with us</p>
        </span>


        <div className="flex flex-col lg:flex-row items-center gap-5">
          {/* call us */}
          <div className="flex flex-col gap-2 items-start py-5 px-10 rounded-md w-fit border bg-white">
            <div className="flex items-start gap-2">
              <div className="p-4 bg-blue-200 inline-block">
                <PhoneCall className="text-blue-700" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Call us now</p>
                <p className="text-sm text-gray-600">we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now</p>
              </div>
            </div>
            <p className="ml-14 text-gray-800">+1-202-555-0126</p>
            <button className="ml-14 flex items-center gap-2 bg-blue-500 text-white px-8 py-2 rounded-sm text-nowrap hover:bg-blue-600">CALL NOW <ArrowRight /> </button>
          </div>
          {/* chat with us */}
          <div className="flex flex-col gap-2 items-start py-5 px-10 rounded-md w-fit border bg-white">
            <div className="flex items-start gap-2">
              <div className="p-4 bg-blue-200 inline-block">
                <MessageSquare className="text-blue-700" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Chat with us</p>
                <p className="text-sm text-gray-600">we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now</p>
              </div>
            </div>
            <p className="ml-14 text-gray-800">support@dropcart</p>
            <button className="ml-14 flex items-center gap-2 bg-green-500 text-white px-8 py-2 rounded-sm text-nowrap hover:bg-green-600">CONTACT US <ArrowRight /> </button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ContactPage