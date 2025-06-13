import {useAuth} from "../../context/AuthContext";
import Button from "../../components/ui/button/Button";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <header className="flex fixed top-0 right-0 left-0 shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] z-50">
      <div className="flex max-w-[1440px] mx-auto flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/" className="max-sm:hidden">
          <img src="/images/bluetokai-logo.png" alt="logo" className="w-[95px] h-[64px] max-sm:w-[80px] max-sm:h-[54px] " />
        </Link>
        <Link to="/dashboard" className="max-sm:block">
          Dashboard
        </Link>
        <div className="flex max-lg:ml-auto space-x-4">
          {
            isAuthenticated ?
             <>
              <div className="flex items-center gap-4">
                <p>{isAuthenticated.username}</p>
                <Button onClick={() => dispatch(logout())} className="w-[80px]" size="sm" type="button">
                  Logout
                </Button>
              </div>
             </>
              :
              <>
                <Button className="w-[80px]" size="sm" type="button" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button className="w-[100px]" size="sm" type="button" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
          }
        </div>
      </div>
    </header>
  );
}
export default Header;