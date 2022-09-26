const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add',checkAuth,ToughtController.createToughts)
router.post('/add',checkAuth,ToughtController.createToughtsPost)
router.get('/',ToughtController.showToughts)
router.get('/dashboard',checkAuth,ToughtController.dashboard)
router.post('/remove',checkAuth,ToughtController.removeTought)
router.get('/edit/:id',checkAuth,ToughtController.updateToughts)
router.post('/edit',checkAuth,ToughtController.updateToughtSave)


module.exports = router 