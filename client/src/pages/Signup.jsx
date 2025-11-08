import {useState} from "react"
import {useContext} from "react"
import {UserContext} from "../context/AppContext"

const SignUp = () => {
    const {setUser,axios,toast,navigate}=useContext(UserContext)

    const [name,setName]=useState("")
    const[email,setEmail]=useState("")  
    const[password,setPassword]=useState("")  
    const[role,setRole]=useState("user")  

    const submitHandler = async (e)=>{
        try{
            e.preventDefault()
            const res = await axios.post('/api/user/register',
                {name,email,password,role}
            )
            const data= await res.data;
            if(data.success){
                setUser(data.user)
                toast.success(data.message || "User registered successfully")
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        }catch(errr){
            toast.error(errr.message || "Something went wrong")
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 opacity-20">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        animation: 'gridMove 20s linear infinite'
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                            Signup
                        </span>
                    </h1>
                    <p className="text-cyan-200 text-sm">Create your CyberLens account</p>
                </div>

                <form onSubmit={submitHandler} className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8 shadow-[0_0_30px_rgba(64,224,208,0.2)] animate-slide-up">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-cyan-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="role" className="block text-sm font-medium text-cyan-400 mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                        >
                            <option value="user">User</option>
                            <option value="authority">Authority</option>
                        </select>
                    </div>

                    <button 
                        className="w-full p-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.5)]" 
                        type="submit"
                    >
                        SIGNUP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
