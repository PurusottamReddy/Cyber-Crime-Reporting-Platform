import { useState, useContext } from "react";
import { UserContext } from "../context/AppContext.jsx";

const LogIn = () => {
    const { setUser, axios, toast, navigate } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const res = await axios.post("/api/user/login", {
                email,
                password,
            });

            const data = res.data;

            if (data.success) {
                setUser(data.user);
                localStorage.setItem("token", data.token);
                toast.success(data.message || "Login successful!...");
                navigate("/");
            } else {
                toast.error(data.message || "Login failed!");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Network error: " + err.message);
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
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
                            Login
                        </span>
                    </h1>
                    <p className="text-cyan-200 text-sm">Access your CyberLens account</p>
                </div>

                <form 
                    className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8 shadow-[0_0_30px_rgba(64,224,208,0.2)] animate-slide-up" 
                    onSubmit={handleSubmit}
                >
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-cyan-400 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-cyan-400 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.5)]"
                    >
                        LOGIN
                    </button>
                </form>

                <p 
                    onClick={()=>navigate("/signup")} 
                    className="mt-6 text-center font-semibold text-cyan-400 hover:text-purple-400 cursor-pointer transition-colors hover:underline"
                >
                    Don't have an account? Register
                </p>
            </div>
        </div>
    );
};

export default LogIn;
