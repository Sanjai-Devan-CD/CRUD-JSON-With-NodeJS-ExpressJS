const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

router.get('/',userController.getAllUser);
router.post('/addUser',validateUser, userController.createUser);
router.get('/:id',userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;