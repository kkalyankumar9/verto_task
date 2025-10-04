import React from "react";

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-80">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
    <p className="text-gray-700 font-medium">Loading...</p>
  </div>
);

export default Loading;
