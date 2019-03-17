import React from 'react';
import {mount} from "enzyme";

import JobForm from "./JobForm";
import mockedJobs from '../../../mock-data/jobs';


function expectElementToHaveValue (element, value) {
  expect(element.prop('value')).toEqual(value);
}

function expectInputToHaveValue (wrapper, field, value) {
  expectElementToHaveValue(wrapper.find(`input[name="${field}"]`), value);
}

function expectTextAreaToHaveValue (wrapper, field, value) {
  expectElementToHaveValue(wrapper.find(`textarea[name="${field}"]`), value);
}

it('Should call onCancel when the cancel button is pressed', () => {
  const listener = jest.fn();
  const wrapper = mount(<JobForm onCancel={listener}/>);

  wrapper.find('button.cancel-job-form').simulate('click');

  expect(listener).toHaveBeenCalled();
});

it('Should call initialize te form with previous values', () => {
  const job = mockedJobs[0].data;
  const wrapper = mount(<JobForm jobData={job}/>);


  expectInputToHaveValue(wrapper, 'name', job.name);
  expectTextAreaToHaveValue(wrapper, 'description', job.description);

  expectInputToHaveValue(wrapper, 'max_votes', job.max_votes);
  expectInputToHaveValue(wrapper, 'num_votes', job.num_votes);
  expectInputToHaveValue(wrapper, 'reward', job.reward / 100);

  expectTextAreaToHaveValue(wrapper, 'html', job.design.html);
  expectTextAreaToHaveValue(wrapper, 'css', job.design.css);
  expectTextAreaToHaveValue(wrapper, 'js', job.design.js);
});


it('Should call initialize te form with default values if no job specified', () => {
  const wrapper = mount(<JobForm/>);


  expectInputToHaveValue(wrapper, 'name', '');
  expectTextAreaToHaveValue(wrapper, 'description', '');

  expectInputToHaveValue(wrapper, 'max_votes', 10);
  expectInputToHaveValue(wrapper, 'num_votes', 3);
  expectInputToHaveValue(wrapper, 'reward', 0.01);

  expectTextAreaToHaveValue(wrapper, 'html', '');
  expectTextAreaToHaveValue(wrapper, 'css', '');
  expectTextAreaToHaveValue(wrapper, 'js', '');
});


// TODO: Tests about validation

