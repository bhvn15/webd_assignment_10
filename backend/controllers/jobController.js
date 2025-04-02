const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { company, title, description, salary } = req.body;

    if (!company || !title || !description || !salary) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newJob = new Job({ company, title, description, salary });
    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
