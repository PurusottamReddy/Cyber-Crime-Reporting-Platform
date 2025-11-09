import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const AllReports = () => {
  const { user, axios, toast } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // New state for filter

  useEffect(() => {
    const fetchReports = async () => {
      try {
        let response;
        let url = '';
        if (user.role === 'user') {
          url = `/api/crime/get-user-crime-reports/${user._id}`;
        } else {
          url = '/api/crime/get-all-crime-reports';
        }

        if (filter !== 'all') {
          url += `?status=${filter}`;
        }
        response = await axios.get(url);
        setReports(response.data.reports || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reports');
        toast.error(err.response?.data?.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReports();
    } else {
      setError('You are not authorized to view reports.');
      setLoading(false);
    }
  }, [user, axios, toast, filter]); // Add filter to dependency array

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleStatusChange = async (crimeId, newStatus) => {
    try {
      await axios.put(`/api/crime/update-status/${crimeId}`, { status: newStatus });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === crimeId ? { ...report, status: newStatus } : report
        )
      );
      toast.success('Report status updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteReport = async (crimeId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/api/crime/delete-crime-report/${crimeId}`);
        setReports((prevReports) => prevReports.filter((report) => report._id !== crimeId));
        toast.success('Report deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete report');
      }
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-cyan-400 text-xl">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-red-400 text-xl">{error}</div>
      </div>
    );
  }

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

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {user.role === 'user' ? 'My Crime Reports' : 'All Crime Reports'}
          </span>
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('Pending')}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
              filter === 'Pending'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleFilterChange('Investigating')}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
              filter === 'Investigating'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Investigating
          </button>
          <button
            onClick={() => handleFilterChange('Resolved')}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
              filter === 'Resolved'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Resolved
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="text-center text-cyan-300 text-xl py-20">
            No crime reports found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl shadow-[0_0_30px_rgba(64,224,208,0.2)] animate-slide-up">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-cyan-400/30">
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">ID</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Title</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Category</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Place of Incident</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Date</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Status</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-b border-cyan-400/20 hover:bg-cyan-400/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300 text-sm">{report._id.slice(-8)}</td>
                    <td className="py-4 px-6 text-white font-medium">{report.title}</td>
                    <td className="py-4 px-6 text-cyan-300">{report.category}</td>
                    <td className="py-4 px-6 text-gray-300">{report.location}</td>
                    <td className="py-4 px-6 text-gray-400">{new Date(report.date).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      {(user.role === 'authority' || user.role === 'admin') ? (
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusChange(report._id, e.target.value)}
                          className={`p-2 rounded-md text-sm font-medium ${report.status === 'pending' 
                            ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                            : report.status === 'Investigating' 
                            ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' 
                            : 'bg-green-400/20 text-green-400 border border-green-400/30'}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Investigating">Investigating</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${report.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : report.status === 'investigating' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' : 'bg-green-400/20 text-green-400 border border-green-400/30'}`}>
                          {report.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <Link 
                          to={`/report/${report._id}`} 
                          className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteReport(report._id)}
                          className="text-red-400 hover:text-red-300 hover:underline transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReports;
