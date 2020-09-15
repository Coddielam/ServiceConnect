const express = require("express");
const app = express();
const connectDB = require("./config/db");
// Connect to database
connectDB();
// use JSON parser
app.get("/", (req, res) => {
  res.send("test");
});
// body parser
app.use(express.json());
// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up on port ${PORT}...`));
