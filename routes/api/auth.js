const express= require('express');
const router=express.Router();

// @route     GET  api/Auth  (request type and endpoint)
// desc         Test route 
// @access  public (means we do not need token for access it is public)
router.get('/',(req,res) => {
    res.send("auth route");
});

module.exports =router;