const express = require('express');
const { createUser, getUser, getUserById } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.post('/', getUser);
router.get('/:id', getUserById);

module.exports = router;
