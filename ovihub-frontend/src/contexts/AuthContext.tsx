import { createContext } from "react";
import type { MeResponse } from "@/api/user";

interface AuthContextType {
   user: MeResponse | null;
   loading: boolean;
   fetchMe: () => Promise<void>;
   logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);