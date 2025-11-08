import React, { useContext, useState } from "react"
import { UserContext } from "../context/AppContext"

const LookUp = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { axios, toast } = useContext(UserContext)

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter a search term")
      return
    }
    setLoading(true)
    setHasSearched(true)
    setResult([]) // Clear previous results
    try {
      const response = await axios.post("/api/crime/fraud-lookup", { related_info: search })
      const data = response.data
      if (data.success) {
        if (data.crimes.length > 0) {
          setResult(data.crimes)
          toast.success("Matching record found")
        } else {
          setResult([])
          toast.error("No matching record found")
        }
      } else {
        toast.error(data.message || "Failed to fetch results")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch results")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => setSearch(e.target.value)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4">
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

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Fraud Lookup
          </span>
        </h1>

        <div className="flex flex-col items-center justify-center mb-12 animate-slide-up">
          <input
            type="text"
            value={search}
            placeholder="Enter phone number, email or website url to search"
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full max-w-2xl p-4 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`mt-4 px-10 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-lg transition-all duration-300 hover:from-cyan-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2`}
          >
            {loading && (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {result.length > 0 ? (
          <div className="space-y-6 animate-slide-up-delay">
            {result.map((item, i) => (
              <div 
                key={i} 
                className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 shadow-[0_0_20px_rgba(64,224,208,0.2)] hover:border-cyan-400 transition-all"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">{item.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                   <p><span className="text-cyan-400 font-semibold">Related Entities:</span> {item.related_info}</p>
                  {/* <p><span className="text-cyan-400 font-semibold">User:</span> {item.user?.name || "Anonymous"}</p> */}
                  <p><span className="text-cyan-400 font-semibold">Category:</span> {item.category}</p>
                  <p><span className="text-cyan-400 font-semibold">Place of Incident:</span> {item.location}</p>
                  <p><span className="text-cyan-400 font-semibold">Date:</span> {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className="md:col-span-2"><span className="text-cyan-400 font-semibold">Description:</span> {item.description}</p>
                  <p><span className="text-cyan-400 font-semibold">Status:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === 'Open' 
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                        : 'bg-gray-400/20 text-gray-400 border border-gray-400/30'
                    }`}>
                      {item.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          hasSearched &&
          !loading && (
            <div className="text-center text-red-400 text-xl py-12">
              No records to display. Try searching for something.
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default LookUp
