const express = require('express');
const router = express.Router();
const {
  getAllBiz,
  getSingleBiz,
  addNewBiz,
  updateBiz,
  deleteBiz
} = require('../controller/business');
// const validateId = require('../middleware/validateId');

// Get all biznesses
router.get('/api/v1/biz', getAllBiz);

// Get a single business
router.get('/api/v1/biz/:id', getSingleBiz);

// Add a new business
router.post('/api/v1/biz', addNewBiz);

// Update a business
router.put('/api/v1/biz/:id', updateBiz);

// Delete a business
router.delete('/api/v1/biz/:id', deleteBiz);

module.exports = router;
