const {Router} = require('express')
const router = Router()
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret')

router.post('/register',
    [
        check('email', 'incorrect email').isEmail(),
        check('name', 'Minimum name length 3 characters').isLength({min: 3}),
        check('password', 'Minimum password length 6 characters').isLength({min: 6})
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                })
            }
            const {email, password, name} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'User with this email already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, name, password: hashedPassword})
            await user.save()

            return res.status(201).json({message: 'User created successfully'})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    })

router.post('/login',
    [
        check('email', 'incorrect email').normalizeEmail().isEmail(),
        check('password', 'password is empty').exists()
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during incorrect data during authorization'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'User is not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password please try again'})
            }

            const tokenExpiresIn = '1d'
            const token = jwt.sign({userId: user.id}, jwtSecret, {expiresIn: tokenExpiresIn})

            return res.json({token, userId: user.id, tokenExpiresIn, avatar: user.avatar, name: user.name})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    })

module.exports = router
