const express= require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator'); 
const bcrypt= require('bcryptjs');
const gravatar = require('gravatar');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     post  api/users  (request type and endpoint)
// desc         Test route 
// @access  public (means we do not need token for access it is public)

router.post('/', 

// name must be an email
[check('name',"name is required").not().notEmpty(),

// email must be valid
check('email','enter valid emai').isEmail(),

// password must be at least 5 chars long
check('password',"password must be at least 5 chars long").isLength({ min: 5 })],
async (req,res) => {

      // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,password}=req.body;

    try{
    //see if user exist
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:'user already exist'}]});
        }
    //get user gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user=new User({
            name,
            email,
            avatar,
            password
        });
    //encrypt password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password, salt);

        await user.save();

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