import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../redux/Slices/quizQuestionSlice";
import { submitQuiz } from "../redux/Slices/submitSlice";
import Loading from "../components/loading";
import Results from "../components/result";
import StartScreen from "../components/startQuiz";
import Question from "../components/questions";

import ProgressBar from "../components/progress";

const QuizPage = () => {
  const dispatch = useDispatch();
  const { questions, status } = useSelector((state) => state.questions);
  const { results } = useSelector((state) => state.submit);

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(300); // 5 min

  useEffect(() => { dispatch(fetchQuiz()); }, [dispatch]);

  useEffect(() => {
    if (!quizStarted || results) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { handleSubmit(); clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStarted, results]);

  const handleSelect = (id, idx) => setAnswers({ ...answers, [id]: idx });
  const handleNext = () => currentIndex < questions.length - 1 && setCurrentIndex(currentIndex + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleSubmit = () => dispatch(submitQuiz(answers));

  if (status === "loading") return <Loading />;
  if (!questions.length) return <p className="text-center mt-10">No questions found.</p>;
  if (!quizStarted) return <StartScreen onStart={() => setQuizStarted(true)} />;
  if (results) return <Results results={results} questions={questions} userAnswers={answers} />;

  const currentQuestion = questions[currentIndex];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">⏱ Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
      </div>

      <ProgressBar current={currentIndex} total={questions.length} />

      <Question
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
