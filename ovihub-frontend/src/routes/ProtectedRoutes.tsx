import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
   //TODO: Roles props, cu care apelez useRoles hook sa verifice rolurile userilor, contextul roles idk
   children: ReactNode;
}

const ProtectedRoute = ({
   children
}: ProtectedRouteProps) => {
   const { user, loading: authLoading } = useAuth();

   if (authLoading) return null;

   if (!user) {
      //TODO: Include toast component (from sonner shadcn) and display error on screen 'Not auth'
      return <Navigate to={"/login"} replace/>
   }

   return <>{children}</>
};

export default ProtectedRoute;