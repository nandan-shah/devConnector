const express= require('express');
const router=express.Router();

// @route     GET  api/users  (request type and endpoint)
// desc         Test route 
// @access  public (means we do not need token for access it is public)
router.get('/',(req,res) => {
    res.send("users route");
});

module.exports =router;