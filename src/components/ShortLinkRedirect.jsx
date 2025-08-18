import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // Assuming you have an API function to get the original URL

const ShortLinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        // Call your API to get the original URL for this short code
        const result = await api.getOriginalUrl(shortCode);
        
        if (result.error) {
          setError("Link not found or expired");
        } else {
          // Redirect to the original URL
          window.location.href = result.originalUrl;
        }
      } catch (err) {
        setError("Failed to redirect. Link may be invalid or expired.");
        console.error("Redirect error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (shortCode) {
      redirectToOriginalUrl();
    } else {
      setError("Invalid short code");
      setLoading(false);
    }
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Link Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default ShortLinkRedirect;