const Router = require('express')
const questionController = require('../controllers/questionController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), questionController.create)
router.get('/', questionController.getAll)
router.delete('/:id', checkRole('ADMIN'), questionController.delete)
router.put('/:id', questionController.update)

module.exports = router