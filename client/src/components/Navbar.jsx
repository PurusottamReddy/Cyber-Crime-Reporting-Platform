import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../context/AppContext';
import axios from 'axios';

const Navbar = () =>{
    const { user,toast, setUser,navigate } = useContext(UserContext);
 
    return(
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-cyan-400/30 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 backdrop-blur-sm relative transition-all">
       <NavLink 
         to='/' 
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-all font-semibold ${
             isActive 
               ? 'text-cyan-400 font-bold shadow-[0_0_15px_rgba(64,224,208,0.5)]' 
               : 'text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(64,224,208,0.3)]'
           }`
         }
       >
        Home
       </NavLink>
     
       <NavLink 
         to='/report-cc'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-all font-semibold ${
             isActive 
               ? 'text-cyan-400 font-bold shadow-[0_0_15px_rgba(64,224,208,0.5)]' 
               : 'text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(64,224,208,0.3)]'
           }`
         }
       >
        Report Crime
       </NavLink>
       <NavLink 
         to='/all-reports'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-all font-semibold ${
             isActive 
               ? 'text-cyan-400 font-bold shadow-[0_0_15px_rgba(64,224,208,0.5)]' 
               : 'text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(64,224,208,0.3)]'
           }`
         }
       >
        All Reports
       </NavLink>
       <NavLink 
         to='/look-up'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-all font-semibold ${
             isActive 
               ? 'text-cyan-400 font-bold shadow-[0_0_15px_rgba(64,224,208,0.5)]' 
               : 'text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(64,224,208,0.3)]'
           }`
         }
       >
       Fraud Lookup 
       </NavLink>

         {!user && (
        <>
            <NavLink 
              to='/login'
              className={({ isActive }) => 
                `px-3 py-2 rounded-md transition-all font-semibold ${
                  isActive 
                    ? 'text-cyan-400 font-bold shadow-[0_0_15px_rgba(64,224,208,0.5)]' 
                    : 'text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(64,224,208,0.3)]'
                }`
              }
            >
                Log In
            </NavLink>
        </>
       )}
       {user && (
        <button onClick={async()=>{
            try{
                await axios.get("/api/user/logout");
                setUser(null);
                toast.success("Logged out successfully");
                navigate("/login");
            }catch(error){
                toast.error(error.response?.data?.message || "Logout failed");
            }
        }} className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition-all hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] font-bold">
            Logout
        </button>
       )}
       </nav>
    )
}

export default Navbar
