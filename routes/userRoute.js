const router = require("express").Router();
const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");


router.get("/getusers", async (req, res) => {
    
    try {
    const data = await userModel.find({})
    res.status(200).send(data);

    } catch(error) {
        res.status(405).send(error.message);
    }
});

router.post("/register", async (req, res) => {
    const { username, password, } =req.body;
    try { 
        if (!username) {
            throw new Error ("Please enter a username");
        }
        if (!password) {
            throw new Error ("Please enter a password");
        }
        
        if (!validator.isStrongPassword(password)) {
            throw new Error ("Password is not strong enough");
        }
        
        const userExists = await userModel.findOne({username: username});
        if (userExists) {
            throw new Error ("User already exists");
        }
        const data = await new userModel({
            username,
            password,
        });
        await data.save();
        res.status(200).send("User created successfully");
    }

        catch(error){
            res.status(405).send(error.message);
    }

});

module.exports = router;