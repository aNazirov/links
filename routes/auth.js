const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/auth')
const router = Router()

router.post(
    '/login',
    [
        check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], 
    controller.login
)
router.post(
    '/register', 
        [
            check('email', 'Некорректный Email').isEmail(),
            check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
        ], 
    controller.register
)

module.exports = router