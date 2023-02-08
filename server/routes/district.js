const Router = require('express')
const districtController = require('../controllers/districtController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', districtController.create)
router.get('/', districtController.getAll)
router.delete('/:id', checkRole('ADMIN'), districtController.delete)
router.put('/:id', districtController.update)

module.exports = router