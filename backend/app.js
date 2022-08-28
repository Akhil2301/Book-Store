require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const expressValidator=require('express-validator')
const cors=require('cors')
//Import routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user')
const categoryRoute=require('./routes/category')
const productRoute=require('./routes/product')
//app
const app = express();


//db

mongoose.connect(process.env.DATABASE)
.then(()=> console.log('Database connected'))

//middleware
app.use(morgan('dev'));


app.use(express.json({limit: "100m"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(cors())
app.use(cookieParser());
app.use(expressValidator());
//routes middleware
app.use('/',authRoutes);
app.use('/',userRoutes);
app.use('/category',categoryRoute)
app.use('/product',productRoute)
const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

