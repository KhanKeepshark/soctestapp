const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()


router.post('/registration', userController.registration)
router.post('/', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/users', userController.getAll)
router.delete('/:id', userController.delete)

module.exports = router