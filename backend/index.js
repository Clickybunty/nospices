const express = require("express");
const cors = require("cors");
const recipesRoute = require('./routes/recipes');
app.use('/api/recipes', recipesRoute);


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello from Express");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
