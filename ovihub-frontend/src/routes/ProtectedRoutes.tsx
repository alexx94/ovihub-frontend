import type { Roles } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

//TODO: Roles props, cu care apelez useRoles hook sa verifice rolurile userilor, contextul roles idk

interface ProtectedRouteProps {
   allowedRoles?: Roles[];
}

const ProtectedRoute = ({
   allowedRoles,
}: ProtectedRouteProps) => {
   const { user, roles, loading: authLoading } = useAuth();

   if (authLoading) return null;

   if (!user) {
      //TODO: Include toast component (from sonner shadcn) and display error on screen 'Not auth'
      console.log("Userul nu este autentificat.");
      return <Navigate to={"/login"} replace />
   }

   if (allowedRoles && roles && !allowedRoles.some((r) => roles.includes(r))) {
      //TODO: Include toast 'Nu ai permisiuni'
      console.log("Userul nu are unul din rolurile: " + allowedRoles);
      return <Navigate to={"/"} replace />
   }

   return <Outlet />
};

export default ProtectedRoute;