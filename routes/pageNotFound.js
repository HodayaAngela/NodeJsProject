const express=require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Page not found')
})
module.exports= router;

