import React from "react";
import {mount} from "enzyme";

import WorkflowsService from "../../../../Services/WorkflowsService";
import {CreateWorkflowModal} from "./CreateWorkflow";

function mockCreateWorkflowToFail() {
  const createWorkflow = jest.fn(() => new Promise(() => {
    throw new Error("can't create workflow");
  }));
  WorkflowsService.createWorkflow = createWorkflow;
  return createWorkflow;
}

const mountCreateWorkflow = () => mount(<CreateWorkflowModal/>);

describe('test the creation of a new workflow', () => {
  it('should show an error if the workflow can\'t be created', async () => {
    const createWorkflow = mockCreateWorkflowToFail();
    const wrapper = mountCreateWorkflow();
    const createWorkflowComponent = wrapper.instance();
    const workflow = {
      name: 'Workflow1',
      description: 'Description of workflow 1'
    };

    await createWorkflowComponent.createNewWorkflow(workflow, {setSubmitting: () => null});
    wrapper.update();

    expect(createWorkflow).toHaveBeenCalled();
    expect(wrapper.state('creationError')).toBe(true);
  });
});
