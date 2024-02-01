require("dotenv").config();
const express = require("express");
const cors = require("cors");
const con = require("./db/connect");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth/", require("./routes/User"));
app.use("/api/Product/", require("./routes/Product"));

app.use(express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
