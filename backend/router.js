const express = require('express');
const router = express.Router();
const noteController = require('./controller');  

 
router.get('/', noteController.findAll);         
router.post('/', noteController.create);         
router.put('/:id', noteController.update);       
router.delete('/:id', noteController.delete);   
router.get('/:id', noteController.findById);

module.exports = router;