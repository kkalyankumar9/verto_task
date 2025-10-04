import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from "./Slices/quizQuestionSlice";
import submitReducer from "./Slices/submitSlice";
export const store = configureStore({
  reducer: { questions: questionsReducer, submit: submitReducer },
})