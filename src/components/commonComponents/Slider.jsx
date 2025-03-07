import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom Next Arrow
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 right-2 sm:right-[-20px] transform -translate-y-1/2 
            bg-white text-orange-500 w-8 h-8 lg:w-10 lg:h-10 shadow rounded-full flex items-center justify-center 
            cursor-pointer z-10 transition hover:bg-orange-500 hover:text-white"
            onClick={onClick}
        >
            <FaChevronRight />
        </button>
    );
}

// Custom Previous Arrow
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 left-2 sm:left-[-20px] transform -translate-y-1/2 
            bg-white text-orange-500 w-8 h-8 lg:w-10 lg:h-10 rounded-full shadow flex items-center justify-center 
            cursor-pointer z-10 transition hover:bg-orange-500 hover:text-white"
            onClick={onClick}
        >
            <FaChevronLeft />
        </button>
    );
}

const SliderSlick = ({ slides }) => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="relative w-full mx-auto">
            <Slider {...settings}>
                {slides}
            </Slider>
        </div>
    );
}

export default SliderSlick;
