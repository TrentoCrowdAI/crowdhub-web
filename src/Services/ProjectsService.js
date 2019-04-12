import {getJSON, postJSON, sendDelete, putJSON} from "./utils";

export const APP_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export const Errors = {
    INVALID_JOB_DATA: 'invalid_job_data'
};

function JSONtoProject(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  return json;
}

function projectToJSON(job) {
  job.data.maxVotes = job.data.max_votes;
  job.data.numVotes = job.data.num_votes;

  return job;
}

export default {
  async getProjects() {
    const jsonList = await getJSON(`${APP_URL}/jobs`);
    return jsonList.map(JSONtoProject);
  },

  async getProject(id) {
    const jsonJob = await getJSON(`${APP_URL}/jobs/${id}`);
    return JSONtoProject(jsonJob);
  },

  async createProject(job) {
    const json = projectToJSON(job);
    return await postJSON(`${APP_URL}/jobs`, json);
  },

  async updateProject(job) {
    try {
      const json = projectToJSON(job);
      return await putJSON(`${APP_URL}/jobs/${job.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_JOB_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteProject(job) {
    return await sendDelete(`${APP_URL}/jobs/${job.id}`);
  },

}
