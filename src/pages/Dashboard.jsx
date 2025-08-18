import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, AlertCircle, Search } from "lucide-react";
import api from "../api";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const result = await api.getLinks(token);
        if (result.error) {
          setError(result.error);
          if (result.error === "Unauthorized") {
            localStorage.removeItem("token");
            navigate("/signin");
          }
        } else {
          setLinks(Array.isArray(result) ? result : result.links || []);
        }
      } catch (err) {
        setError("Failed to fetch links");
        console.error("Fetch links error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [navigate]);

  const totalPages = Math.ceil(links.length / pageSize);

  // 🔍 Filter links by search
  const filteredLinks = links.filter(
    (link) =>
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${window.location.origin}/${link.shortCode}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Shortened Links</h1>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by URL or short link..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        
        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100/80">
              <tr>
                <th className="w-1/20 p-4 text-sm font-semibold text-gray-700">S.No</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Original URL</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Short Link</th>
                <th className="w-1/6 p-4 text-sm font-semibold text-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLinks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No links found.
                  </td>
                </tr>
              ) : (
                paginatedLinks.map((link, index) => (
                  <tr key={link.id} className="border-t border-gray-200">
                    {/* Serial number */}
                    <td className="p-4 text-gray-700">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="p-4 break-all text-gray-700">{link.originalUrl}</td>
                    <td className="p-4">
                      <a
                        href={`${window.location.origin}/${link.shortCode}`}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {window.location.origin}/{link.shortCode}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                    <td className="p-4 text-gray-600">
                      {link.createdAt ? formatDate(link.createdAt) : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition ${
                  page === currentPage
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
