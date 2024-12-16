const express = require('express');
const { createJob, getJobs, getJobsById } = require('../controllers/jobController');

const router = express.Router();

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobsById);

module.exports = router;
