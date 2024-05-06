const express = require("express");
const router = express.Router();

router.get("/apply", (reg, res) => {
    res.status(200).send("This route is good to go");
})

module.exports = router;