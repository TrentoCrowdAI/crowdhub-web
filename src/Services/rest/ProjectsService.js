import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {API_URL} from "../../config";


const PROJECTS_URL = `${API_URL}/projects`;

export const Errors = {
    INVALID_WORKFLOW_DATA: 'invalid_project_data'
};

function JSONtoProject(json) {
  json.id = parseInt(json.id);
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);
  json.ownerId = json.id_user;

  return json;
}

function projectToJSON(job) {
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

  async createProject(project) {
    const json = projectToJSON(project);
    return await postJSON(`${PROJECTS_URL}`, json);
  },

  async updateProject(project) {
    try {
      const json = projectToJSON(project);
      return await putJSON(`${PROJECTS_URL}/${project.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_PROJECT_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteProject(project) {
    return await sendDelete(`${PROJECTS_URL}/${project.id}`);
  },

}
