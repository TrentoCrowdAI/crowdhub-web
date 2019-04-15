import {APP_URL} from "../config";
import {mockFetchToReturnJson} from "../testHelpers/services";
import mockedWorkflows from '../mock-data/workflows';
import WorkflowsService from "./WorkflowsService";

describe('get list of workflows of project', () => {
  it('should send a GET to /workflow?project=id and return the array of workflows', async () => {
    const project = {id: 0};
    mockFetchToReturnJson(mockedWorkflows);
    const res = await WorkflowsService.getWorkflowsOfProject(project);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/workflows?project=${project.id}`, undefined);
    expect(res).toEqual(mockedWorkflows);
  });
});


describe('create new workflow', () => {
  it('should send a POST to /workflows', async () => {
    const workflow = mockedWorkflows[0];
    mockFetchToReturnJson(mockedWorkflows);
    await WorkflowsService.createWorkflow(workflow);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflow)
    });
  });
});


describe('delete a workflow', () => {
  it('should send a DELETE to /workflows/:id', async () => {
    const workflow = mockedWorkflows[0];
    await WorkflowsService.deleteWorkflow(workflow);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/workflows/${workflow.id}`, {method: 'DELETE'});
  });
});
