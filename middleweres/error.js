module.exports = errFn = (err,req,res,next)=>{
    console.log(err.message);
    res.status(500).send(`<h1>ERROR</h1>`);
}