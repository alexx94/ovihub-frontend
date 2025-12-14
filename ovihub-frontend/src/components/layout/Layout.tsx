import { motion } from "framer-motion";
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
   // hide nav + footer at login page
   const location = useLocation();

   const hideNavFooter = (location.pathname === "/login");

   return (
      <div className="min-h-screen w-full bg-background">
         {!hideNavFooter && <Nav />}
         <main>
            <motion.div
            key={location.pathname}
            initial={{opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.3 }}
            >    
               <Outlet /> 
            </motion.div>
         </main>
         {!hideNavFooter && <Footer />}
      </div>
   )
};

export default Layout;