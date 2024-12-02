const express = require('express');
const router = express.Router();

const {deleteBoard, update, byId } = require('../controllers/board')

router.get('/update',byId)
router.delete('/deleteBoard',deleteBoard)
router.put('/update',update)

module.exports = router;