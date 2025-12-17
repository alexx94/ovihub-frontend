import { motion } from "framer-motion";
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
   const location = useLocation();
   
   return (
      <div className="min-h-screen w-full bg-background flex flex-col">
         <Nav />
         <main className="flex-1">
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
         <Footer />
      </div>
   )
};

export default Layout;