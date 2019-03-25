import React from 'react';
import {mount} from "enzyme";

import JobForm from "./JobForm";
import mockedJobs from '../../../mock-data/jobs';
import {rewardIntegerToString} from "../utils/job";
import {expectInputToHaveValue, expectTextAreaToHaveValue} from "../../../testHelpers/inputs";

it('Should call onCancel when the cancel button is pressed', () => {
  const listener = jest.fn();
  const wrapper = mount(<JobForm onCancel={listener} cancelText="Cancel"/>);

  wrapper.find('button.cancel-job-form').simulate('click');

  expect(listener).toHaveBeenCalled();
});

it('Should initialize the form with previous values', () => {
  const job = mockedJobs[0].data;
  const wrapper = mount(<JobForm jobData={job}/>);


  expectInputToHaveValue(wrapper, 'name', job.name);
  expectTextAreaToHaveValue(wrapper, 'description', job.description);

  expectInputToHaveValue(wrapper, 'max_votes', job.max_votes);
  expectInputToHaveValue(wrapper, 'num_votes', job.num_votes);
  expectInputToHaveValue(wrapper, 'reward', rewardIntegerToString(job.reward));
});


it('Should initialize the form with default values if no job specified', () => {
  const wrapper = mount(<JobForm/>);


  expectInputToHaveValue(wrapper, 'name', '');
  expectTextAreaToHaveValue(wrapper, 'description', '');

  expectInputToHaveValue(wrapper, 'max_votes', 10);
  expectInputToHaveValue(wrapper, 'num_votes', 3);
  expectInputToHaveValue(wrapper, 'reward', 0.01);
});


// TODO: Tests about validation

