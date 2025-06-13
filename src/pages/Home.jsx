import { Link } from "react-router";
import Carousal from "../components/ui/Slider";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Button from "../components/ui/button/Button";

const testimonials = [
  {
    id: 1,
    text: "I've been drinking coffee for a year now but never tried Blue Tokai. I heard about Attikan a lot and it was worth the hype! I am not a fan of darker roasts but it was one of the smoothest coffees I've tried till now. I'm definitely ordering again.",
    rating: 3,
    author: "Ekta Renish"
  },
  {
    id: 2,
    text: "I've been drinking coffee for a year now but never tried Blue Tokai. I heard about Attikan a lot and it was worth the hype! I am not a fan of darker roasts but it was one of the smoothest coffees I've tried till now. I'm definitely ordering again.",
    rating: 5,
    author: "Sparta Devil"
  },
  {
    id: 3,
    text: "I've been drinking coffee for a year now but never tried Blue Tokai. I heard about Attikan a lot and it was worth the hype! I am not a fan of darker roasts but it was one of the smoothest coffees I've tried till now. I'm definitely ordering again.",
    rating: 4,
    author: "Ekta Renish"
  }
];

const TestimonialCard = ({ text, rating, author }) => (
  <div className="py-[30px] px-[25px] flex-1">
    <p className="text-subtitle-sm mb-[15px] text-center">{text}</p>
    <div className="flex items-center justify-center mb-[15px]">
      {[...Array(5)].map((_, index) => (
        index < rating ? (
          <IoIosStar key={index} className="w-5 h-5 text-amber-500" />
        ) : (
          <IoIosStarOutline key={index} className="w-5 h-5 text-gray-300" />
        )
      ))}
    </div>
    <span className="text-normal font-bold text-center block">{author}</span>
  </div>
);

const Home = () => {
  return (
    <>
      <div className="mt-[76px]">
        <Carousal />
      </div>
      <section className="px-10 py-10 max-md:px-4 max-w-[1440px] mx-auto">
        <div className="flex items-center max-md:flex-col gap-4">
          <div className="flex-1">
            <Link to="/">
              <img src="/images/banner.jpg" alt="banner 1" className="w-full h-[400px] object-cover rounded-lg" />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/">
              <img src="/images/banner-2.jpg" alt="banner 2" className="w-full h-[400px] object-cover rounded-lg" />
            </Link>
          </div>
        </div>
      </section>
      <section className="px-10 py-10 max-md:px-4 max-w-[1440px] mx-auto">
        <div className="flex items-center max-md:flex-col gap-4 max-md:gap-8">
          <div className="flex-1">
            <h3 className="text-title-xl max-lg:text-title-md mb-5">New to Specialty Coffee?</h3>
            <p className="text-title-sm max-lg:text-subtitle-sm ">Let's start brewing! Check beginner-friendly products to get started.</p>
            <Button className="w-[150px] mt-4 font-bold text-lg" variant="outline" type="button">
              Shop Now
            </Button>
          </div>
          <div className="flex-1">
            <img src="/images/banner.jpg" alt="banner 1" className="w-full h-[400px] object-cover rounded-lg" />
          </div>
        </div>
      </section>
      <section className="px-10 py-10 max-md:px-4 max-w-[1440px] mx-auto">
        <div className="flex items-center max-md:flex-col gap-4 max-md:gap-8">
          <div className="flex-1">
            <h3 className="text-title-xl max-lg:text-title-md mb-5">Brew More. Save More!</h3>
            <p className="text-title-sm max-lg:text-subtitle-sm mb-5 ">When you get a subscription from us, you:</p>
            <ul>
              <li className="text-lg max-lg:text-subtitle-sm ">01 / Save up to 20%</li>
              <li className="text-lg max-lg:text-subtitle-sm ">02 / Enjoy convenience with doorstep deliveries</li>
              <li className="text-lg max-lg:text-subtitle-sm ">03 / Experiment more with new and different coffees</li>
              <li className="text-lg max-lg:text-subtitle-sm ">04 / Customise your plan completely</li>
              <li className="text-lg max-lg:text-subtitle-sm ">05 / Stay stocked and never run out of coffee!</li>
            </ul>
          </div>
          <div className="flex-1">
            <img src="/images/coffee.jpg" alt="banner 1" className="w-full h-[400px] object-cover rounded-lg" />
          </div>
        </div>
      </section>
      <section className="px-10 py-10 max-md:px-4 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-center mb-10">
          <img src="/images/customer.png" alt="customer" className="h-[105px] w-[124px]" />
          <h3 className="text-title-xl max-lg:text-title-lg">Happy Customers</h3>
        </div>
        <div className="flex items-stretch max-md:flex-col gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
