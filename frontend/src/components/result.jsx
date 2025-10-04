import React from "react";

const Results = ({ results, questions, userAnswers }) => {
  const actualResults = results.results; // extract actual results

  const handleRestart = () => {
    window.location.reload();
  };

  const getQuestionById = (id) => questions.find((q) => q.id === id);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-xl shadow-lg font-sans">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        🎉 Quiz Results

      </h1>
      <p className="text-lg mb-4">Score: {actualResults.score}</p>
      <p className="text-lg mb-4">Total Questions: {actualResults.total}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Wrong Answers:</h2>
      {actualResults.wrongAnswers.length ? (
        actualResults.wrongAnswers.map((id) => {
          const q = getQuestionById(id);
          return (
            <div
              key={id}
              className="p-3 mb-2 rounded-lg bg-red-50 border-l-4 border-red-500"
            >
              <p className="font-semibold">{q.text}</p>
              <p>
                 Answer:{" "}
                {userAnswers[id] !== undefined
                  ? q.options[userAnswers[id]]
                  : "Not Attempted"}
              </p>
           
            </div>
          );
        })
      ) : (
        <p>0</p>
      )}

      <h2 className="text-xl font-semibold mt-4 mb-2">Not Attempted:</h2>
      {actualResults.notAttempted.length ? (
        actualResults.notAttempted.map((id) => {
          const q = getQuestionById(id);
          return (
            <div
              key={id}
              className="p-3 mb-2 rounded-lg bg-yellow-50 border-l-4 border-yellow-400"
            >
              <p className="font-semibold">{q.text}</p>
            </div>
          );
        })
      ) : (
        <p>None</p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
