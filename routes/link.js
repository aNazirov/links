const {Router} = require('express')
const controller = require('../controllers/link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth , controller.generate)
router.get('/', auth , controller.getAll)
router.get('/:id', auth , controller.getById)


module.exports = router