import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-sky-200 pt-12 pb-6 px-10 tracking-wide">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <Link to="/">
            <img src="/images/bluetokai-logo.png" alt="logo" className="lg:w-48 w-30" />
          </Link>
        </div>

        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/">
                <FaFacebookSquare className="w-6 h-6 text-black" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaInstagram className="w-6 h-6 text-black" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaTwitter className="w-6 h-6 text-black" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-am mb-6 text-black">Useful links</h4>
          <ul className="space-y-4 pl-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">Featured</Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">New Arrivals</Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">New Arrivals</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-am mb-6 text-black">Information</h4>
          <ul className="space-y-4 pl-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">About Us</Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm">Sale</Link>
            </li>
            <li>
              <Link to="/sdf" className="text-gray-400 hover:text-white text-sm">Documentation</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer> 
  )
}
export default Footer;