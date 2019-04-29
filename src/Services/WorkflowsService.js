import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {APP_URL} from "../config";


const WORKFLOWS_URL = `${APP_URL}/workflows`;

export const Errors = {
  INVALID_WORKFLOW_DATA: 'invalid_workflow_data'
};

const JSONtoWorkflow = ({id, id_project, data}) => ({
  id,
  projectId: parseInt(id_project),
  ...data
});


const workflowToJSON = ({id, projectId, name, description, graph}) => ({
  id,
  id_project: projectId,
  data: {
    name,
    description,
    graph
  }
});


export default {
  async getWorkflowsOfProject(project) {
    const jsonList = await getJSON(`${WORKFLOWS_URL}?projectId=${project.id}`);
    return jsonList.map(JSONtoWorkflow);
  },

  async getWorkflow(id) {
    const workflow = await getJSON(`${WORKFLOWS_URL}/${id}`);
    return JSONtoWorkflow(workflow);
  },

  async createWorkflow(workflow) {
    const json = workflowToJSON(workflow);
    return await postJSON(WORKFLOWS_URL, json);
  },

  async updateWorkflow(workflow) {
    try {
      const json = workflowToJSON(workflow);
      console.info('[WorkflowService] updateWorkflow', json);
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

  async startWorkflow(workflow) {
    await postJSON(`${WORKFLOWS_URL}/${workflow.id}/start`);
  }

}
