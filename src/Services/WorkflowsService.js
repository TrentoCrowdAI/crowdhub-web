import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {APP_URL} from "../config";


const WORKFLOWS_URL = `${APP_URL}/workflows`;

export const Errors = {
  INVALID_WORKFLOW_DATA: 'invalid_workflow_data'
};

function JSONtoWorkflow(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  return json;
}

function workflowToJSON(job) {

  return job;
}

export default {
  async getWorkflowsOfProject(projectId) {
    const jsonList = await getJSON(`${WORKFLOWS_URL}?project=${projectId}`);
    return jsonList.map(JSONtoWorkflow);
  },

  async getWorkflow(id) {
    const jsonJob = await getJSON(`${WORKFLOWS_URL}/${id}`);
    return JSONtoWorkflow(jsonJob);
  },

  async createWorkflow(workflow) {
    const json = workflowToJSON(workflow);
    return await postJSON(`${WORKFLOWS_URL}`, json);
  },

  async updateWorkflow(workflow) {
    try {
      const json = workflowToJSON(workflow);
      return await putJSON(`${WORKFLOWS_URL}/${workflow.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_WORKFLOW_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteWorkflow(workflow) {
    return await sendDelete(`${WORKFLOWS_URL}/${workflow.id}`);
  },

}
