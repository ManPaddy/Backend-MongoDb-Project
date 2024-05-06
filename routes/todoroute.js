const router = require("express").Router();
const todoModel = require("../models/todomodel");

router.get("/getalltodos", async(reg, res) => {
    try {
        const data = await todoModel.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(405).send(error.message);
    }
});

router.post("/addtodo", async (req, res) => {
    const { item } =req.body;
    try {
    if (!item) {
        throw new Error("Item is required");
    }
    const data = await new todoModel({
        item: item,
    });
    await data.save();
    res.status(200).send("Todo has been added successfully");
    } catch(error) {
        res.status(405).send(error.message);
    }
});

module.exports = router;