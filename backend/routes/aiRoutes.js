const express = require('express');
const router = express.Router();
const { generateExplanation } = require('../controllers/aiControllers');

// POST request to generate explanation
router.post('/generate', generateExplanation);

module.exports = router;