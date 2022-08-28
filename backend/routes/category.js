const express=require('express');
const router=express.Router()

const {create,CategoryById,read,remove,update,list}=require('../controllers/category');
const {isAdmin,requireSignin,isAuth}=require('../controllers/auth');
const {userById}=require('../controllers/user');
const {categoryValidator}=require('../validator/index');

router.post('/create/:userId',categoryValidator,requireSignin,isAdmin,create)
router.get('/read/:userId/:categoryId',requireSignin,isAdmin,read)
router.delete('/remove/:userId/:categoryId',requireSignin,isAdmin,remove)
router.put('/update/:userId/:categoryId',requireSignin,isAdmin,update)
router.get('/list',list)
router.param('categoryId',CategoryById)
router.param('userId',userById)

module.exports=router