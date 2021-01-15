var express = require('express');
var router = express.Router();
//Importing all things needed
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken")
const {clearRes, veryToken} = require('../utils/auth')

router.post('/signup', (req,res) => {
    const {name, last_name, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) return res.status(403).json({msg:"Passwords do not match"})

    bcrypt.hash(password,10).then((hashedPassword) => {
        const user_body = {
            name,
            last_name,
            email,
            password: hashedPassword
        };

        User.create(user_body).then((user) => {
            const newUser = clearRes(user.toObject())

                const token = jwt.sign({id:user._id},process.env.SECRET, {
                    expiresIn:"1d"
                });

                res.cookie("token", token, {
                    expires: new Date(Date.now + 86400000),
                    secure: false,
                    httpOnly: true,
                }).json({user:newUser,code:200})
            res.status(200).json({msg:"the user was create"})
        }).catch((err) => {
            res.status(400).json({msg:"There as an error", err})
        })
    })

});

//Editar (update)
// post patch

router.patch("/:id", veryToken, (req,res,next) => {
    const {id} = req.params;
    User.findByIdAndUpdate(id, req.body, { new : true })
        .then((Trainers) => {
            
            res.status(200).json({result:Trainers})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})

router.post("/login", (req,res,next) => {
    const {email, password} = req.body;

    User.findOne({email}).then((user) => {

        if (user == null) return res.status(403).json({msg:"The user is not in the database"})

        bcrypt.compare(password, user.password).then((match) => {

            if(match){

                const newUser = clearRes(user.toObject())

                const token = jwt.sign({id:user._id},process.env.SECRET, {
                    expiresIn:"1d"
                });

                res.cookie("token", token, {
                    expires: new Date(Date.now + 86400000),
                    secure: false,
                    httpOnly: true,
                }).json({user:newUser,code:200})
            } else {
                return res.status(401).json({msg:"the password does not exist"})
            }
        })
    }). catch((err) => {
        res.status(400).json({msg:"an error came up", err})
    })
});

router.post('/logout', (req,res) => {
    res.clearCookie('token').json({msg:"Come back soon!!"})
})

module.exports = router;
