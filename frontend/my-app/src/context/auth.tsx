import { useContext, useState, type ReactNode } from 'react'
import { createContext } from 'react'
import {useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from 'axios';

//"Any place that uses this box can expect these three things: a user or nothing, and two buttons to login or logout."

interface user{
 name: string,
 email: string
 picture: string
}

interface AuthUserdata{
    user: user| null,
    login: () => void //no inputs thats why () and no return void just starts the login
    logout: ()=> void
}
const AuthContext= createContext<AuthUserdata | null >(null); //creates new context obj-box you put info about user n share with component that wants it
 export const AuthProvider = ({children}: {children: ReactNode}) => {

      const [user, setUser] = useState<user| null>(null);
    const login = useGoogleLogin({
        onSuccess:async tokenResponse =>{
          const {data}= await axios.get( 'https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  "Authorization": `Bearer ${tokenResponse.access_token}`
                }})
            setUser(data) // data.data or {data}  now it becomes data at setuser
          toast.success('Login Successful')

          await axios.post('http://localhost:5000/api/users', data)
        },
        onError: ()=>{
           toast.error('Login Failed')
        }
    })
  const logout = () => {
    setUser(null);
    toast.info("Logged out");
  };
   
return(
<AuthContext.Provider  value={{user, login, logout}}>
  {children}
</AuthContext.Provider>
)

}

export const useAuth = () => {
  const context=useContext(AuthContext)
  if(!context){
    throw new Error("use wiithin Authprovider")
  }

  return context
}
