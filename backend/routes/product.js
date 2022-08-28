const express=require('express')
const router=express.Router();
const {create,productById,read,remove,update,list,leastRelated,listCategories,listBySearch}=require('../controllers/product')
const {productValidator}=require('../validator/index')
const {userById}=require('../controllers/user')
const {requireSignin,isAdmin,isAuth}=require('../controllers/auth')
const upload=require('../utils/multer')

router.post('/create/:userId',upload.single('photo'),requireSignin,productValidator,isAdmin,create)
router.get('/read/:productId',read)
router.delete('/remove/:productId/:userId',requireSignin,isAdmin,isAuth,remove)
router.put('/update/:productId/:userId',upload.single('photo'),requireSignin,productValidator,isAdmin,update)
router.get('/list',list)
router.get('/related/:productId',leastRelated)
router.get('/categories',listCategories)
router.post('/by/search',listBySearch)
router.param('userId',userById)
router.param('productId',productById)

module.exports=router