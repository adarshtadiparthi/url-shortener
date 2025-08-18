import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Copy, Check, ExternalLink, ArrowLeft } from "lucide-react";

const Result = () => {
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const shortCode = params.get("short");
  const shortUrl = `${window.location.origin}/${shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Shortened!</h1>
          <p className="text-gray-600">Your link is ready to share</p>
        </div>

        {/* Result Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {shortCode ? (
            <>
              {/* Short URL Display */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shortened URL
                </label>
                <div className="relative">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <ExternalLink className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 break-all"
                    >
                      {shortUrl}
                    </a>
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`w-full py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                  copied
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white focus:ring-green-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>

              {/* Success Message */}
              {copied && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-medium text-center">
                    Link copied to clipboard successfully!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-500 font-medium">No shortened link found.</p>
              <p className="text-gray-400 text-sm mt-2">Please try shortening a URL first.</p>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Shorten Another URL
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;