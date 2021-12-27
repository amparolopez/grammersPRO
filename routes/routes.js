const Router = require ('express').Router()
const validator = require ('../config/validator')
const userControllers = require ('../controllers/userControllers')
const passport = require ("../config/passport")


const {addUser, signIn, startWithToken}=userControllers


// users 

Router.route('/user/signup')
.post(validator,addUser)

Router.route('/user/signin')
.post(signIn)

Router.route('/user/signin/token')
.post(passport.authenticate("jwt",{session:false}),startWithToken)


module.exports = Router