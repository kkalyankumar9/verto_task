import React from "react";

const Question = ({ question, answer, onSelect }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-6">
    <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
    <div className="flex flex-col gap-3">
      {question.options.map((opt, idx) => (
        <label
          key={idx}
          className={`cursor-pointer border rounded-lg p-3 hover:bg-indigo-50 transition-colors flex items-center`}
        >
          <input
            type="radio"
            name={`q-${question.id}`}
            checked={answer === idx}
            onChange={() => onSelect(question.id, idx)}
            className="mr-3"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default Question;
