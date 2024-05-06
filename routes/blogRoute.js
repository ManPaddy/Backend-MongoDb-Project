const blogModel = require("../models/blogModel");
const router = require("express").Router();


router.get("/getposts", async (req, res) => {
    
    try {
    const data = await blogModel.find({})
    res.status(200).send(data);

    } catch(error) {
        res.status(405).send(error.message);
    }
});

router.post("/addpost", async (req, res) => {
    const { title, content, comments } =req.body;
    try { 
        if (!title) {
            throw new Error ("Title is required");
        }
        if (!content) {
            throw new Error ("Content is required");
        }
        const newdata = await new blogModel({
            title,
            content,
            comments: [],
        });
        await newdata.save();
        res.status(200).send({post: newdata, message: "Post added successfully"});
    }

    catch(error){
        res.status(405).send(error.message);
    }

});

router.delete("/deletepost/:id", async (reg, res) => {
    const { id } = reg.params;
    try { 
        await blogModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ message: "Post deleted successfully"});
    } catch(error) {
        res.status(405).send(error.message);
        
    }
})

router.get("/get-single-post/:id", async (req, res) => {
    const {id} = req.params;
    try {
    const data = await blogModel.findOne({ _id: id});
    if (data) {
    res.status(200).send(data);
    } else {
        throw new Error("Could not find blog post with id");
    }
    } catch(error) {
        res.status(405).send(error.message);
    }
});

router.put("/updatepost", async (req, res) => {
    const { id, title, content } = req.body;
    try {
        const exists = await blogModel.findOne({_id: id});
        if (!exists) {
            throw new Error("Post does not exist")
        }
    await blogModel.findByIdAndUpdate(
        {_id: id},
        {title: title, content: content}
    );
    res.status(200).send({ message: "Post updated successfully"});
    } catch (error) {
        res.status(405).send(error.message)
    }
});

module.exports = router;