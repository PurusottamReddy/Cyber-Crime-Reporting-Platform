import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/AppContext"

const Report = () => {
  const { id } = useParams()
  const [report, setReport] = useState({})
  const { toast, axios } = useContext(UserContext)

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const res = await axios.get(`/api/crime/get-crime-report/${id}`)
        const data = await res.data
        if (data.success) {
          setReport(data.report)
        }
        else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error("error")
      }
    }
    getReportDetails()
  }, [id, axios, toast])

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

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Report Details
          </span>
          <span className="block text-cyan-300 text-lg mt-2 font-normal">ID: {id}</span>
        </h1>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8 shadow-[0_0_30px_rgba(64,224,208,0.2)] animate-slide-up">
          <div className="space-y-4">
            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Reported By:</p>
              <p className="text-white text-xl">{report.anonymous ? "Anonymous" : report.user?.name}</p>
            </div>

            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Title:</p>
              <p className="text-white text-xl">{report.title}</p>
            </div>

            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Category:</p>
              <p className="text-purple-300 text-xl">{report.category}</p>
            </div>

            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Description:</p>
              <p className="text-gray-300 text-lg leading-relaxed">{report.description}</p>
            </div>

            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Location:</p>
              <p className="text-white text-xl">{report.location}</p>
            </div>

            <div className="border-b border-cyan-400/20 pb-4">
              <p className="text-cyan-400 font-semibold text-lg mb-1">Status:</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                report.status === 'Open' 
                  ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                  : 'bg-gray-400/20 text-gray-400 border border-gray-400/30'
              }`}>
                {report.status}
              </span>
            </div>

            <div>
              <p className="text-cyan-400 font-semibold text-lg mb-4">Evidence:</p>
              <div className="flex flex-wrap gap-4">
                {(Array.isArray(report.evidence)
                  ? report.evidence
                  : report.evidence
                    ? [report.evidence]
                    : []
                ).map((file, i) => {
                  if (!file) return null;

                  const getFileType = (url) => {
                    const ext = url.split(".").pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
                    if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";
                    if (ext === "pdf") return "pdf";
                    return "other";
                  };

                  const type = getFileType(file);

                  if (type === "image") {
                    return (
                      <img
                        key={i}
                        src={file}
                        alt="Evidence"
                        className="w-64 h-64 object-cover rounded-lg border-2 border-cyan-400/30 hover:border-cyan-400 transition-all"
                      />
                    );
                  } else if (type === "video") {
                    return (
                      <video
                        key={i}
                        src={file}
                        controls
                        className="w-64 h-64 rounded-lg border-2 border-cyan-400/30 hover:border-cyan-400 transition-all"
                      />
                    );
                  } else if (type === "pdf") {
                    return (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 rounded-lg hover:bg-cyan-400/30 hover:border-cyan-400 transition-all"
                      >
                        View PDF Evidence
                      </a>
                    );
                  } else {
                    return (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-purple-400/20 border border-purple-400/30 text-purple-400 rounded-lg hover:bg-purple-400/30 hover:border-purple-400 transition-all"
                      >
                        Download File
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
