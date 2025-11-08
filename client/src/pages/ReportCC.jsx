import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ReportCC = () => {
  const { user, axios, toast, navigate } = useContext(UserContext);

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    related_info: '',
    anonymous: false,
  });
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newValidFiles = [];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const MAX_FILES = 5;

    if (evidence.length + files.length > MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} is too large. Maximum size is 5MB.`);
      } else {
        newValidFiles.push(file);
      }
    });

    setEvidence((prevEvidence) => [...prevEvidence, ...newValidFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to report a crime');
      navigate('/login');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('user', user._id);
    data.append('anonymous', formData.anonymous);
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('related_info', formData.related_info);
    evidence.forEach((file) => {
      data.append('evidence', file);
    });

    try {
      const response = await axios.post('/api/crime/create-crime-report', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success('Crime report submitted successfully!');
        navigate('/all-reports');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Report Cyber Crime
          </span>
        </h1>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-8 shadow-[0_0_30px_rgba(64,224,208,0.2)] animate-slide-up">
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="mr-3 w-4 h-4 accent-cyan-400"
            />
            <label htmlFor="anonymous" className="text-cyan-300">
              Report Anonymously
            </label>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="category" className="block text-cyan-400 font-semibold mb-2">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 pr-10 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all appearance-none cursor-pointer hover:border-cyan-400/50 hover:bg-gray-900/70 hover:shadow-[0_0_10px_rgba(64,224,208,0.2)]"
                required
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%2340E0D0' d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
              >
                <option value="" disabled hidden className="bg-gray-900 text-gray-400">
                  Select a Category 
                </option>
                <option value="Financial Fraud" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Financial Fraud
                </option>
                <option value="Identity Theft" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Identity Theft
                </option>
                <option value="Deepfake" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Deepfake
                </option>
                <option value="Hacking" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Hacking
                </option>
                <option value="Online Harassment" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Online Harassment
                </option>
                <option value="Cyberstalking" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Cyberstalking
                </option>
                <option value="CSAM" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  CSAM
                </option>
                <option value="Phishing" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Phishing
                </option>
                <option value="Intellectual Property Theft" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Intellectual Property Theft
                </option>
                <option value="Cyberterrorism" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Cyberterrorism
                </option>
                <option value="Other" className="bg-gray-900 text-white hover:bg-cyan-400/20">
                  Other
                </option>
              </select>
              {formData.category && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(64,224,208,0.8)]"></div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="block text-cyan-400 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              required
              placeholder="Enter report title"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-cyan-400 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
              required
              placeholder="Describe the incident in detail"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-cyan-400 font-semibold mb-2">
                  Place of Incident
                </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              required
              placeholder="Enter place of incident(online,physical location) "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="date" className="block text-cyan-400 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="related_info" className="block text-cyan-400 font-semibold mb-2">
              Related Entities
            </label>
            <input
              type="text"
              id="related_info"
              name="related_info"
              value={formData.related_info}
              onChange={handleChange}
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              required
              placeholder="Enter related information(email, phone, website)"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="evidence" className="block text-cyan-400 font-semibold mb-2">
              Evidence (screenshots, documents, etc.)
              {evidence.length > 0 && (
                <span className="ml-2 text-purple-400 text-sm">({evidence.length} files selected)</span>
              )}
            </label>
            <input
              type="file"
              id="evidence"
              name="evidence"
              onChange={handleFileChange}
              multiple
              className="w-full p-3 border border-cyan-400/30 rounded-lg bg-gray-900/50 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-400/20 file:text-cyan-400 hover:file:bg-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-3 w-4 h-4 accent-cyan-400"
              required
            />
            <label htmlFor="terms" className="text-cyan-300 text-sm">
              I agree that the information provided is true and accurate
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportCC;
