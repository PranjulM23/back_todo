const jwt = require("jsonwebtoken")

function setuser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET)
}
function getuser(req, res, next) {
    const beaer = req.headers?.authorization;
    const token  = beaer?.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }


}

module.exports = { getuser, setuser }