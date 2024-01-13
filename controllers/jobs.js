const Jobs = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/ErrorClass");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, jobLength: jobs.length });
};
const getJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Jobs.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError("No Job Found...");
  }

  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  //set the createdBy using the userId coming from the authenticationMiddleware
  req.body.createdBy = req.user.userId;

  const job = await Jobs.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("Fields should be filled...");
  }

  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    throw new NotFoundError("No Job Found...");
  }

  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Jobs.findByIdAndDelete({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError("No Job Found...");
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
