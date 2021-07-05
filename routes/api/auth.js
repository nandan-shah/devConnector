const express= require('express');
const router=express.Router();
const auth=require('../../middleware/auth');

const User=require('../../models/User');

const { check, validationResult } = require('express-validator'); 
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     GET  api/Auth  (request type and endpoint)
// desc         Test route 
// @access  public (means we do not need token for access it is public)
router.get('/',auth,async (req,res) => {
    try{
const user= await User.findById(req.user.id).select('-password');
res.json(user);
    }catch(err){
        consol.error(err.message);
        res.status(500).send("server error");
    }
});

// @route     post  api/auth  (request type and endpoint)
// desc         Authentication and user get tokenn
// @access  public (means we do not need token for access it is public)
router.post('/', 


[
// email must be valid
check('email','enter valid emai').isEmail(),

// password must be at least 5 chars long
check('password',"password is require").exists()],
async (req,res) => {

      // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;

    try{
    //see if user exist
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:'invalid credentials'}]});
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'invalid credentials'}]});
        }
    //return jsonwebtoken(bcz when user register we want to log in) 
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token) => {
                if(err) throw err;
                res.json({token});
            });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports =router;