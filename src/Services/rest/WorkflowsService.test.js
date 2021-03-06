import {API_URL} from "../../config";
import {mockFetchToReturnJson} from "../../testHelpers/services";
import {serverWorkflow, serviceWorkflows} from '../../mock-data/workflows';
import WorkflowsService from "./WorkflowsService";

describe('get list of workflows of project', () => {
  it('should send a GET to /workflow?project=id and return the array of workflows', async () => {
    const project = {id: 0};
    mockFetchToReturnJson(serverWorkflow);
    const res = await WorkflowsService.getWorkflowsOfProject(project);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/workflows?projectId=${project.id}`, undefined);
    expect(res).toEqual(serviceWorkflows);
  });
});


describe('create new workflow', () => {
  it('should send a POST to /workflows', async () => {
    await WorkflowsService.createWorkflow(serviceWorkflows[0]);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serverWorkflow[0])
    });
  });
});


describe('delete a workflow', () => {
  it('should send a DELETE to /workflows/:id', async () => {
    const workflow = serviceWorkflows[0];
    await WorkflowsService.deleteWorkflow(workflow);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/workflows/${workflow.id}`, {method: 'DELETE'});
  });
});

describe('estimate the cost of a do block', () => {
  it('should send a POST to /workflows/:id/:blockId', async () => {
    // given
    const workflowId = 123;
    const blockId = 234;

    // when
    await WorkflowsService.estimateDoBlockCost(workflowId, blockId);

    // then
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/workflows/${workflowId}/${blockId}/estimated-cost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
});
