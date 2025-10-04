import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://verto-task.onrender.com/api/submit";

// Async thunk to submit quiz answers
export const submitQuiz = createAsyncThunk(
  "submit/submitQuiz",
  async (answers) => {
    const response = await axios.post(`${API_URL}`, { answers });
    console.log(response.data);
    return response.data;
  }
);

const submitSlice = createSlice({
  name: "submit",
  initialState: {
    results: null,
    status: "idle",
    error: null
  },
  reducers: {
    resetResults: (state) => {
      state.results = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { resetResults } = submitSlice.actions;
export default submitSlice.reducer;
