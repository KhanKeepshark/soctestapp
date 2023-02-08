const Router = require('express')
const answerController = require('../controllers/answerController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', answerController.create)
router.get('/', answerController.getAll)
router.delete('/:id', checkRole('ADMIN'), answerController.delete)

module.exports = router