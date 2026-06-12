const express = require('express');
const userRoute = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json())

app.use('/api/users',userRoute);

app.use((req,res)=>
{
    console.log("Page Not Found")
    res.status(404).json({message : "Page Not Found"})
});

app.use(errorHandler.errorHandler);

module.exports = app;