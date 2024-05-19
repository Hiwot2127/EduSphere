const express = require("express");
const cors = require("cors");
const app = express();

const connect = require("./config/db");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const userController = require("./controller/user.controller");
const { authenticate } = require("./middlewares/authenticate");

app.use("/join", userController);
app.post("/auth", authenticate, async (req, res) => {
  try {
    return res.status(200).send({ auth: true, user: req.user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log('listening of port ${PORT}');
  } catch (err) {
    console.warn(err.message);
  }
  ;

});