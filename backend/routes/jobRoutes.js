const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /create/job
router.post('/create/job', jobController.createJob);

// GET /jobs
router.get('/jobs', jobController.getAllJobs);

module.exports = router;
