import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

//TODO: Roles props, cu care apelez useRoles hook sa verifice rolurile userilor, contextul roles idk

const ProtectedRoute = () => {
   const { user, loading: authLoading } = useAuth();

   if (authLoading) return null;

   if (!user) {
      //TODO: Include toast component (from sonner shadcn) and display error on screen 'Not auth'
      return <Navigate to={"/login"} replace/>
   }

   return <Outlet />
};

export default ProtectedRoute;