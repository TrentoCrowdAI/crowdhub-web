import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {API_URL} from "../../config";


const WORKFLOWS_URL = `${API_URL}/workflows`;

export const Errors = {
  INVALID_WORKFLOW_DATA: 'invalid_workflow_data'
};

const JSONtoWorkflow = ({id, id_project, data}) => ({
  id,
  projectId: parseInt(id_project),
  ...data
});


const workflowToJSON = ({id, projectId, name, description, graph, shared}) => ({
  id,
  id_project: projectId,
  data: {
    name,
    description,
    graph,
    shared
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
    console.log("[WorkflowsSerivice] updateWorkflow()");
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

  async saveAndStartWorkflow (workflow) {
    console.log("[WorkflowsSerivice] saveAndStartWorkflow()");
    await this.updateWorkflow(workflow);
    await this.startWorkflow(workflow);
  },

  async startWorkflow(workflow) {
    console.log("[WorkflowsSerivice] startWorkflow()");
    const startedRunId = await postJSON(`${WORKFLOWS_URL}/${workflow.id}/start`);
    return startedRunId;
  },

  async estimateDoBlockCost (workflowId, blockId) {
    return await postJSON(`${WORKFLOWS_URL}/${workflowId}/${blockId}/estimated-cost`);
  }
}
