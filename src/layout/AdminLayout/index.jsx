import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const AdminLayout = () => {
    return (
        <div className="relative">
            <Header />
                <Outlet />
            <Footer />
        </div>
    );
};
export default AdminLayout;