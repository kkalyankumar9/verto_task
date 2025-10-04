import React from "react";

const ProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;
  return (
    <div className="mb-4">
      <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
        <div
          className="h-3 bg-indigo-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-gray-700 mt-1">{current + 1} / {total} completed</p>
    </div>
  );
};

export default ProgressBar;
