const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');


router.get('/test', product_controller.test);

router.get('/all',product_controller.task_all)

router.get('/:id',product_controller.task_details);
router.post('/create', product_controller.task_create);
router.put('/:id/update', product_controller.task_update);
router.put('/:id/completed', product_controller.task_completed);
router.put('/update', product_controller.task_update_all);
router.delete('/:id/delete', product_controller.task_delete);
router.delete('/deletecompl', product_controller.task_delete_all_completed) 
module.exports = router;