import React from "react";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import EmbeddableWorkflowsList, {FetchingWorkflows, FetchingWorkflowsError} from "./EmbeddableWorkflowsList";
import WorkflowsService from "../../../Services/WorkflowsService";
import {serviceWorkflows} from "../../../mock-data/workflows";
import mockedProject from "../../../mock-data/projects";
import {WorkflowsTable} from "./WorkflowsTable";
import {expectComponent} from "../../../testHelpers/components";

const project = mockedProject[0];

describe('should show the list of workflows', () => {

  async function mountWorkflowsList() {
    return await mount(
      <MemoryRouter >
        <EmbeddableWorkflowsList project={project}/>
      </MemoryRouter>
    )
  }

  function mockGetWorkflowsToReturn(result) {
    const getWorkflows = jest.fn(() => new Promise(resolve => resolve(result)));
    WorkflowsService.getWorkflowsOfProject = getWorkflows;
    return getWorkflows;
  }

  function mockGetWorkflowsToFail() {
    const getWorkflows = jest.fn(() => new Promise(() => {
      throw new Error("can't fetch workflows");
    }));
    WorkflowsService.getWorkflowsOfProject = getWorkflows;
    return getWorkflows;
  }


  it('shows a loading message while loading', async () => {
    const getWorkflows = mockGetWorkflowsToReturn(serviceWorkflows);
    const wrapper = await mountWorkflowsList();

    expect(getWorkflows).toHaveBeenCalled();
    expectComponent(wrapper, FetchingWorkflows);
  });


  it('shows the list of workflows after loading', async () => {
    const getWorkflows = mockGetWorkflowsToReturn(serviceWorkflows);
    const wrapper = await mountWorkflowsList();

    expect(getWorkflows).toHaveBeenCalled();
    wrapper.update();

    expectComponent(wrapper, WorkflowsTable);
  });

  test.skip("shows an error if projects can't be loaded", async () => {
    const getWorkflows = mockGetWorkflowsToFail();
    const wrapper = await mountWorkflowsList();

    expect(getWorkflows).toHaveBeenCalled();
    wrapper.update();

    expectComponent(wrapper, FetchingWorkflowsError);
  });
});
