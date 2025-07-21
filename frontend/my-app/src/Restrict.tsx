import { Navigate } from "react-router-dom";
import { useAuth } from "./context/auth"
import type { ReactNode } from "react";


const Restrict = ({children}: {children: ReactNode}) => {
    const { user} = useAuth();

     if(!user){
     return <Navigate to="/login" replace/>
   }
  return children
}

export default Restrict