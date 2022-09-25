const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add',checkAuth,ToughtController.createToughts)
router.get('/',ToughtController.showToughts)
router.get('/dashboard',checkAuth,ToughtController.dashboard)

module.exports = router 