const sqlite3=require('sqlite3').verbose();

const db=new sqlite3.Database("./quiz.db",(err)=>{
    if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
})
db.serialize(()=>{
    db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      options TEXT NOT NULL,
      correctIndex INTEGER NOT NULL
    )
  `);
  db.all("SELECT * FROM questions", (err, rows) => {
  if (rows.length === 0) {
    db.run(
      `INSERT INTO questions (text, options, correctIndex)
      VALUES 
      ('What is the capital of France?', '["Paris", "London", "Rome", "Berlin"]', 0),
      ('Which language runs in a web browser?', '["Java", "C", "Python", "JavaScript"]', 3),
      ('What does SQL stand for?', '["Structured Query Language", "Simple Query Language", "Standard Query List", "Structured Question Language"]', 0),
      ('Which planet is known as the Red Planet?', '["Earth", "Mars", "Jupiter", "Venus"]', 1),
      ('What is the largest mammal on Earth?', '["Elephant", "Blue Whale", "Giraffe", "Shark"]', 1),
      ('Which company developed the Java programming language?', '["Sun Microsystems", "Microsoft", "Google", "IBM"]', 0),
      ('In which year did World War II end?', '["1945", "1939", "1918", "1965"]', 0),
      ('Who wrote the play Romeo and Juliet?', '["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"]', 0),
      ('What is the boiling point of water at sea level?', '["100°C", "90°C", "80°C", "120°C"]', 0),
      ('Which gas do plants absorb from the atmosphere for photosynthesis?', '["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"]', 1)`
    );
    console.log("✅ 10 sample questions inserted");
  }
});

})
module.exports = db;