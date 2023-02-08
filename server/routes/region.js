const Router = require('express')
const regionController = require('../controllers/regionController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', regionController.create)
router.get('/', regionController.getAll)
router.delete('/:id', checkRole('ADMIN'), regionController.delete)
router.put('/:id', regionController.update)

module.exports = router