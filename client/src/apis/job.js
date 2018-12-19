import { $http } from '../utils';

function getAllJobs() {
  return $http.get('/jobs')
    .then(res => res.data);
}

function createJob(name, desc) {
  return $http.post('/job', {
    desc,
    name: name || `name_${new Date().getTime()}`,
  })
    .then(res => res.data);
}

function updateJob(job) {
  return $http.put(`/job/${job._id}`, job)
    .then(res => res.data);
}

function deleteJob(id) {
  return $http.delete(`/job/${id}`)
    .then(res => res.data);
}

export default {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
