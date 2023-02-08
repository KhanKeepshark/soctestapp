const Router = require('express')
const userDataController = require('../controllers/userDataController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), userDataController.create)
router.get('/', userDataController.getAll)
router.delete('/:id', checkRole('ADMIN'), userDataController.delete)

module.exports = router