const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require('express-validator')
const User = require('../models/User')

module.exports.register = async (req, res) => {
    try {
        
        const error = validationResult(req)
        if(!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({
                message: 'Такой пользователь уже существует'
            })
        }
        const hashedPassword = await bcript.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()
        res.status(201).json({
            message: 'Пользователь создан'
        })
    } catch (err) {
        res.status(500).json({ 
            message: 'Что-то пошло не так, попробуйте снова'
        } )
    }
}

module.exports.login = async (req, res) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: 'Пользователь не найден'
            })
        }
        const isMatch = await bcript.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: 'Неверный пароль'
            })
        }

        const token = jwt.sign({userId: user.id}, config.get('jwtSecure'), {expiresIn: '1h'})
        
        res.json({token, userId: user.id})
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'} )
    }
}