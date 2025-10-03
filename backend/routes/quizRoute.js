const express = require("express");
const db = require("../db");


const router = express.Router();
// 📌 Get all quiz questions (without correct answers)
router.get("/questions", (req, res) => {
  db.all("SELECT id, text, options FROM questions", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const formatted = rows.map(q => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options)
    }));
    res.json(formatted);
  });
});
// 📌 Submit answers & calculate score
router.post("/submit", (req, res) => {
  const userAnswers = req.body.answers; // {id: answerIndex}

  // ✅ Validate request body
  if (!userAnswers || typeof userAnswers !== "object") {
    return res.status(400).json({
      status: "error",
      message: "Invalid request. 'answers' must be an object {id: optionIndex}"
    });
  }

  db.all("SELECT * FROM questions", [], (err, questions) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Database error",
        error: err.message
      });
    }

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No quiz questions found"
      });
    }

    let score = 0;
    let wrongAnswers = [];
    let notAttempted = [];

    questions.forEach((q) => {
      const userAnswer = userAnswers[q.id];

      if (userAnswer === undefined) {
        // Not attempted
        notAttempted.push(q.id);
      } else if (userAnswer === q.correctIndex) {
        // Correct
        score++;
      } else {
        // Wrong
        wrongAnswers.push(q.id);
      }
    });

    // ✅ Success response
    return res.status(200).json({
      status: "success",
      message: "Quiz submitted successfully",
      results: {
        score,
        total: questions.length,
        wrongAnswers,
        notAttempted
      }
    });
  });
});


module.exports = router;