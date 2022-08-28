const express=require('express');
const router=express.Router();
const {requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const {userById,read,update}=require('../controllers/user')

router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
});

router.get('/user/read/:userId',requireSignin,isAuth,isAdmin,read)
router.put('/user/update/:userId',requireSignin,isAuth,isAdmin,update)

router.param('userId',userById);
module.exports=router;