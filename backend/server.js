const express=require('express');
const cors=require('cors');
const router = require('./routes/quizRoute');


const app=express();

const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/api",router)

app.listen(PORT,()=>{  
    try {
        console.log(`Server is running on port ${PORT}`);
        
    } catch (error) {
        
    }
 })