const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware: Configured CORS
app.use(cors({
  origin: [
    'http://www.jaypandya.systems', 
    'https://www.jaypandya.systems', 
    'http://localhost:5173', // Vite default local port
    'http://localhost:3000'  // React default local port
  ],
  credentials: true, // Required if your frontend sends session cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/routines", require("./routes/routines"));
app.use("/api/social", require("./routes/social"));
app.use("/api/nutrition", require("./routes/nutrition"));
app.use("/api/ai", require("./routes/ai"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});