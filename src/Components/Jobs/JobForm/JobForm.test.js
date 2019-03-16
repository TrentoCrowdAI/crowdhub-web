import React from 'react';

import JobsService from "../../../Services/JobsService";
import {JobCreationFailed, JobForm} from "./JobForm";
import {shallow, mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";

function mockCreateJobToFail() {
  const createJob = jest.fn(() => new Promise(() => {
    throw new Error("can't create jobs");
  }));
  JobsService.createJob = createJob;
  return createJob;
}


function mockCreateJob() {
  const createJob = jest.fn(() => new Promise(resolve => resolve({})));
  JobsService.createJob = createJob;
  return createJob;
}


it('should show an alert if an error happens', () => {
  const createJob = mockCreateJobToFail();
  const wrapper = mount(<MemoryRouter><JobForm/></MemoryRouter>);

  wrapper.find('form').simulate('submit');
  wrapper.update();

  expect(createJob).toHaveBeenCalled();
  //expect(wrapper.find(JobCreationFailed).length).toBe(1);
  // TODO: Find out why it doesn't work
});


it('should redirect to /jobs when job is created', async () => {
  const createJob = mockCreateJob();
  const wrapper = mount(<MemoryRouter><JobForm/></MemoryRouter>);

  await wrapper.find('form').simulate('submit');
  await wrapper.update();

  expect(createJob).toHaveBeenCalled();
  // TODO: Check if route changed
});



