require("./db/connection");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const movieRouter = require("./movie/movieRouter")
const userRouter = require("./users/userRouter")
const { tokenCheck } = require("./middleware");

app.use(express.json());
app.use(movieRouter);
app.use(userRouter);

app.get("/", tokenCheck, (req, res) => {
    res.status(200).send({ message: "You should only see this if you are logged in" })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});