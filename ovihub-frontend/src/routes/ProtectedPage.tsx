import type { Roles } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedPageProps {
  allowedRoles?: Roles[];
  children: React.ReactNode;
}

const ProtectedPage = ({ allowedRoles, children }: ProtectedPageProps) => {
  const { user, roles, loading: authLoading } = useAuth();

  if (authLoading) return null;

  if (!user) {
      console.log("Userul nu este autentificat.");
      return <Navigate to="/login" replace />;
  } 
  
  if (allowedRoles && roles && !allowedRoles.some(r => roles.includes(r))) {
      console.log("Userul nu are unul din rolurile: " + allowedRoles);
      return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedPage;