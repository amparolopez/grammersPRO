const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

const userControllers = {

    addUser: async (req, res) => {
        let { email, password, userName,  lastName, country, imgUrl, googleFlag } = req.body
        
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
                    country,
                    imgUrl,
                    googleFlag
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
        const { email, password, googleFlag } = req.body
        try {
            const userExists = await User.findOne({ email })
            
            if (!userExists) {
                res.json({ success: false, error: true, answer:[{message:"Email is incorrect"}]})
            } else {
                let samePass = bcryptjs.compareSync(password, userExists.password)
                if (samePass) {
                    const token = jwt.sign({...userExists},process.env.SECRET_KEY)
       
                    const { userName, imgUrl, email, _id, userAdmin } = userExists
                    
                    res.json({ success: true, answer: { token, userName, imgUrl, email, id:_id , userAdmin }, error: null })
                } else {
                    res.json({ success: false, error: true, answer:[{message:"password is incorrect"}]})
                }
            }
            if (userExists.googleFlag && !googleFlag) throw new Error("Invalid email");

        } catch (error) {
            res.json({ success: false, answer: null, error: error })
        }
    },
    startWithToken: async (req, res) => {
        res.json({ success: true, answer: {firstName: req.user.userName, email:req.user.email, imgUrl:req.user.imgUrl, id: req.user._id, userAdmin:req.user.userAdmin}, error: null })
    },
    getUser: async(req, res) => {
        try {
            const user = await User.find();
            res.json({ success: true, response: user });
          } catch (error) {
            res.json({ success: false, response: error });
          }
    },
    obtenerAdmin: async (req, res) => {
        const {userAdmin, idUser} = req.body
        try{
            const user = await User.findOneAndUpdate({email : idUser}, {userAdmin : userAdmin});
            res.json({ success: true, response: user });
        }catch(error){
            res.json({success: false, response: error})
        }
    },
    adminBan: async (req, res) => {
        const {idUser} = req.body
        try{
            const user = await User.findOneAndDelete({_id : idUser})
            res.json({success: true, response: user});
        }catch(error){
            res.json({success: false, response: error})
        }
    },
    adminBanPost: async (req, res) => {
        const {idPost} = req.body
        try{
            const post = await Post.findOneAndDelete({_id : idPost})
            res.json({success: true, response: post});
        }catch(error){
            res.json({success: false, response: error})
        }
    }
  }

  module.exports = userControllers;