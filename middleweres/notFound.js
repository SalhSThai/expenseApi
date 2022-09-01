module.exports = notFound = (req,res,next)=>{
    console.log(err.message);
    res.status(404).send(`<h1>404:ERROR</h1>`);
}