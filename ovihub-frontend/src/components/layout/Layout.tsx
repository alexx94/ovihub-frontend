import Footer from "./Footer";
import Nav from "./Nav";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
   // hide nav + footer at login page
   const location = useLocation();

   const hideNavFooter = (location.pathname === "/login");

   return (
      <div className="min-h-screen w-full bg-background">
         {!hideNavFooter && <Nav />}
         <main>
            <Outlet /> 
         </main>
         {!hideNavFooter && <Footer />}
      </div>
   )
};

export default Layout;