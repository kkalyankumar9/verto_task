import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://verto-task.onrender.com/api/questions";

// Async thunk to fetch quiz questions
export const fetchQuiz = createAsyncThunk("questions/fetchQuiz", async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    status: "idle",
    error: null
  },
  reducers: {
    resetQuestions: (state) => {
      state.questions = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { resetQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
