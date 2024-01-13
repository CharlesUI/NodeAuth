const getAllJobs = (req, res) => {
    res.send('GET ALL')
}
const getJob = (req, res) => {
    res.send('GET ONE')
}
const createJob = (req, res) => {
    res.send('CREATE')
}
const updateJob = (req, res) => {
    res.send('UPDATE')
}
const deleteJob = (req, res) => {
    res.send('DELETE')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}