import JobsService from '../../../Services/JobsService';
import {mount} from "enzyme";
import EditProject from "./EditProject";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import {createMockForServiceMethod} from "../../../testHelpers/services";
import mockedJobs from '../../../mock-data/jobs';

function mockUpdateJobToFail() {
  const updateJob = jest.fn(() => new Promise(() => {
    throw new Error("can't update jobs");
  }));
  JobsService.updateJob = updateJob;
  return updateJob;
}

const mockGetJobToReturn = createMockForServiceMethod(JobsService, 'getProject');

async function mountEditJob() {
  return await mount(
    <MemoryRouter initialEntries={['jobs', '1', 'edit']}>
      <EditProject match={{url: '/jobs/edit', params: {id: 1}}}/>
    </MemoryRouter>
  )
}



it("should show an error if the job can't be updated", async () => {
  const job = mockedJobs[0];
  mockGetJobToReturn(job);
  const updateJob = mockUpdateJobToFail();
  const wrapper = await mountEditJob();

  wrapper.update();
  const editJobComponent = wrapper.find(EditProject).instance();
  await editJobComponent.handleJobSubmission(job.data, {setSubmitting: () => null});

  expect(updateJob).toHaveBeenCalled();
});
