const errorHandler = (req,res,next) =>
{
    console.error("Unhandled Error");
    res.status(404).json({error:"Internal server Error"});
}

module.exports = {errorHandler};