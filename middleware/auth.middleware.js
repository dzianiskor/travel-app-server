const jwt = require('jsonwebtoken')
const config = require('config')

const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'no authorization'})
        }

        req.user = jwt.verify(token, jwtSecret)
        next()
    } catch (e) {
        res.status(401).json({message: 'no authorization'})
    }
}
