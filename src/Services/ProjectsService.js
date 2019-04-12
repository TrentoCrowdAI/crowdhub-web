import {getJSON, postJSON, putJSON, sendDelete} from "./utils";

export const APP_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const PROJECTS_URL = `${APP_URL}/projects`;

export const Errors = {
    INVALID_PROJECT_DATA: 'invalid_project_data'
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
    const jsonList = await getJSON(PROJECTS_URL);
    return jsonList.map(JSONtoProject);
  },

  async getProject(id) {
    const jsonJob = await getJSON(`${PROJECTS_URL}/${id}`);
    return JSONtoProject(jsonJob);
  },

  async createProject(job) {
    const json = projectToJSON(job);
    return await postJSON(`${PROJECTS_URL}`, json);
  },

  async updateProject(job) {
    try {
      const json = projectToJSON(job);
      return await putJSON(`${PROJECTS_URL}/${job.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_PROJECT_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteProject(job) {
    return await sendDelete(`${PROJECTS_URL}/${job.id}`);
  },

}
