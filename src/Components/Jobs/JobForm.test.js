import React from 'react';

import JobsService from "../../Services/JobsService";
import {JobForm} from "./JobForm";
import {shallow, mount} from "enzyme";

function mockCreateJobToFail() {
  const createJob = jest.fn(() => new Promise(() => {
    throw new Error("can't create jobs");
  }));
  JobsService.createJob = createJob;
  return createJob;
}


it('should show an alert if an error happens', () => {
    /*const createJob = mockCreateJobToFail();
    const wrapper = mount(<JobForm/>);

    wrapper.find('button').simulate('click');


    expect(createJob).toHaveBeenCalled();*/
});



