const connecToMongo = require("./db");
const express = require("express");
// const router = require("./routes/notes");
connecToMongo();

const app = express();
const port = 3000;
// app.use(express.json())///////////if we want to use for req.body then we have to use this middleware
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
