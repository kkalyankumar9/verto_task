import React from "react";

const StartScreen = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
    <h1 className="text-4xl font-bold mb-6">📝 Welcome to the Quiz</h1>
    <button
      onClick={onStart}
      className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:scale-105 transition-transform"
    >
      Start Quiz
    </button>
  </div>
);

export default StartScreen;
