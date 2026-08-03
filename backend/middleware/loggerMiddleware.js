const loggerMiddleware=(req,res,next)=>{
    console.log("request recived");
    console.log("method:",req.method);
    console.log("URL:",req.originalUrl);
    console.log("Time:",new Date().toLocaleString());
    next();
};
module.exports=loggerMiddleware;