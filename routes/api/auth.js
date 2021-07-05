const express= require('express');
const router=express.Router();
const auth=require('../../middleware/auth');

const User=require('../../models/User');
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

module.exports =router;