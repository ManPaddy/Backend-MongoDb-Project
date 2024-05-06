const testroute = require("./routes/testroute");
const todoRoute = require("./routes/todoroute");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


app.use(cors());
app.use(express.json());

app.listen(process.env. PORT || 3006, () => {
    console.log("App has started");
});
app.use("/api", userRoute);
app.use("/api", blogRoute);
app.use("/api", testroute);
app.use("/api", todoRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database has started");
})
.catch((error) => {
    console.log(error);
});