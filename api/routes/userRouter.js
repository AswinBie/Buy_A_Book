const express =  require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { verifyAdmin, verifyUser } = require('../utils/verify');

const router = express.Router();

router.get("/get-all-users", verifyAdmin, getAllUsers);

router.get("/get-user-by-id/:id", verifyUser, getUserById);

module.exports = router;