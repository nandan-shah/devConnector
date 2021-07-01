const express= require('express');
const router=express.Router();

// @route     GET  api/post  (request type and endpoint)
// desc         Test route 
// @access  public (means we do not need token for access it is public)
router.get('/',(req,res) => {
    res.send("post route");
});

module.exports =router;