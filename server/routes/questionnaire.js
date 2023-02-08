const Router = require('express')
const questionnaireController = require('../controllers/questionnaireController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', questionnaireController.create)
router.get('/', questionnaireController.getAll)
router.delete('/:id', checkRole('ADMIN'), questionnaireController.delete)
router.put('/:id', questionnaireController.update)

module.exports = router