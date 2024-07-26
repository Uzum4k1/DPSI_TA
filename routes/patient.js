const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const patientController = require('../controllers/patientController');

router.get('/checkBPJS', auth, patientController.checkBPJS);
router.post('/registerPatient', auth, patientController.registerPatient);
router.get('/visitHistory', auth, patientController.visitHistory);

module.exports = router;
