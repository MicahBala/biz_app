const express = require('express');
const bizRoute = require('./business');

const router = express.Router();

router.use(bizRoute);

module.exports = router;
