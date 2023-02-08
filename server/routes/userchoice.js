const Router = require('express')
const userChoiceController = require('../controllers/userChoiceController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', userChoiceController.create)
router.get('/', userChoiceController.getAll)
router.delete('/:id', checkRole('ADMIN'), userChoiceController.delete)

module.exports = router