var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;

module.exports = function(req,res,next){
    const authorizationHeaader = req.headers.authorization;
    if(authorizationHeaader){
        const token = req.headers.authorization.split(' ')[1];
        try{
            let result = jwt.verify(token, jwtKey);
            if(result){
                next();
            } else {
                res.status(401).send('Unauthorize Token.');
            }
        } catch(err){
            res.status(401).send('Token is expired.');
        }
    } else {
        res.status(401).send('Authentication error. Token required.');
    }
}