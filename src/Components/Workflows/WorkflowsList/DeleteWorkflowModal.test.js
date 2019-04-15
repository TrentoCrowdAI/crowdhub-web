import React from 'react';
import {mount} from "enzyme";

import DeleteWorkflowModal from "./DeleteWorkflowModal";
import mockedWorkflows from '../../../mock-data/workflows';
import WorkflowsService from "../../../Services/WorkflowsService";

const workflow = mockedWorkflows[0];

const mountDeleteWorkflow = () => {
  const onCancel = jest.fn();
  const onDeleted = jest.fn();
  const wrapper = mount(
    <DeleteWorkflowModal workflowToDelete={workflow}
                         show={true}
                         onCancel={onCancel}
                         onWorkflowDeleted={onDeleted}/>
  );

  return {wrapper, onCancel, onDeleted};
};

function mockDeleteWorkflows() {
  const deleteWorkflow = jest.fn(() => new Promise(resolve => resolve()));
  WorkflowsService.deleteWorkflow = deleteWorkflow;
  return deleteWorkflow;
}

test('should not delete the workflow if the user cancels the confirmation', () => {
  const {wrapper, onCancel} = mountDeleteWorkflow();

  wrapper.find('button.cancel').simulate('click');

  expect(onCancel).toHaveBeenCalled();
});


test('should delete the workflow if the user confirm the confirmation', async () => {
  const deleteWorkflow = mockDeleteWorkflows();
  const {wrapper, onDeleted} = mountDeleteWorkflow();

  wrapper.find('button.confirm').simulate('click');
  await wrapper.update();

  expect(deleteWorkflow).toHaveBeenCalled();
  expect(onDeleted).toHaveBeenCalled();
});
