const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userControllers = {

    addUser: async (req, res) => {
        let { email, password, userName, lastName, imgUrl, country, google } = req.body
        try {
            const userExists = await User.findOne({ email })
            if (userExists) {
                res.json({ success: false, error:true, answer:[{message:"This email is already registered"}]})
            } else {
                const hashPass = bcryptjs.hashSync(password, 10)
                const newUser = new User({
                    email,
                    password: hashPass,
                    userName,
                    lastName,
                    imgUrl,
                    country, 
                    google
                })
                const token = jwt.sign({...newUser},process.env.SECRET_KEY)//2 args - 2do clave secreta 
                await newUser.save()
                res.json({ success: true, response: {token,newUser}, error: null })
            }
        } catch (error) {
            res.json({ success: false, answer: null, error: error })
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body
        try {
            const userExists = await User.findOne({ email })
            console.log(userExists)
            if (!userExists) {
                res.json({ success: false, error: true, answer:[{message:"Email is incorrect"}]})
            } else {
                let samePass = bcryptjs.compareSync(password, userExists.password)
                if (samePass) {
                    const token = jwt.sign({...userExists},process.env.SECRET_KEY)
                    const { userName, imgUrl, email, _id } = userExists
                    res.json({ success: true, answer: { token, userName, imgUrl, email, id:_id }, error: null })
                } else {
                    res.json({ success: false, error: true, answer:[{message:"password is incorrect"}]})
                }
            }
        } catch (error) {
            res.json({ success: false, answer: null, error: error })
        }
    },
    startWithToken: async (req, res) => {
        res.json({ success: true, answer: {email:req.user.email, imgUrl:req.user.imgUrl, id: req.user._id}, error: null })
    },
    getUser: async(req, res) => {
        try {
            const user = await User.find();
            res.json({ success: true, response: user });
          } catch (error) {
            res.json({ success: false, response: error });
          }
    }
  }

  module.exports = userControllers;