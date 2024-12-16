const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobsById = async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: 'Job not found' });
  }
};

module.exports = { createJob, getJobs, getJobsById };
