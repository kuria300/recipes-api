import { useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const containRef= useRef<HTMLSpanElement | null>(null);
  const {user, login, logout} = useAuth()
   
  useEffect(()=>{
    if(!containRef.current) return;

     const ctx= gsap.context(()=>{
      gsap.to( containRef.current, {
        rotate:70,
        repeat:1,
        yoyo:true,
        duration:1.2,
        ease: "power1.inOut",
        transformOrigin: "top center",
        transformPerspective: 1000,
      })
     }, containRef)

     return()=> ctx.revert();
  }, [])
  return (
    <>
      <header className="bg-white md:px-40 py-4 shadow-xl font-work-sans">
        <nav className="flex flex-row md:flex-row items-center justify-between gap-3 px-4">
        <div className="text-black-100 font-bold text-xl"><span className="text-orange-300"  style={{ display: "inline-block" }} ref={containRef}>u</span>niStudent</div>
          <div className="flex space-x-4" >
              <Link to='/' className="text-black-100">Home</Link>
              {user ?(
                <>
               <Link to='/login' className="text-black-100" onClick={()=>logout()}>Logout</Link>
               <img src={user.picture} className="rounded-xl size-6" />
               </>
              ):(
               <Link to='/' className="text-black-100" onClick={()=>login()}>Login</Link>
              )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar