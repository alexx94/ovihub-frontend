import { createContext } from "react";
import type { MeResponse, Roles } from "@/api/user";

interface AuthContextType {
   user: MeResponse | null;
   roles: Roles[] | null;
   loading: boolean;
   fetchMe: () => Promise<void>;
   logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);