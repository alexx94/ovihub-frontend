import { useAuth } from "@/hooks/useAuth";
import NavItem from "./NavItem";
import { LogIn, LogOut } from "lucide-react";

const AuthNavItem = () => {
   const { user, logout } = useAuth();

   return (
      <>
         {!user ? (
            <NavItem 
               href="/login" 
               label="Conecteaza-te" 
               icon={LogIn} 
               buttonVariant="default" 
            />
         ) : (
            <NavItem 
               href="/"
               label="Iesi din cont" 
               icon={LogOut} 
               buttonVariant="destructive" 
               onClick={() => {
                  logout();
                  console.log("S-a facut logout log check");
               }}
            />
         )}

      </>
   )
};

export default AuthNavItem;