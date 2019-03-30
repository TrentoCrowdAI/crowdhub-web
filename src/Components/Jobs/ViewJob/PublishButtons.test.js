import React from "react";
import {mount} from "enzyme";

import PublishButtons, {PublishedModal, PublishFailedModal, PublishingModal, PublishJobModal} from "./PublishButtons";
import jobs from "../../../mock-data/jobs";
import JobsService from "../../../Services/JobsService";

const validJob = jobs[0];

const mountButtons = () => mount(<PublishButtons job={validJob}/>);


const mountAndPressPublish = () => {
  const wrapper = mountButtons();

  wrapper.find('button.MTurk-publish').simulate('click');

  expect(wrapper.find(PublishJobModal).length).toBe(1);

  return wrapper;
};


const mountAndPressPublishAndConfirm = () => {
  const wrapper = mountAndPressPublish();

  wrapper.find(PublishJobModal).first().find('button.confirm').simulate('click');

  return wrapper;
};


it('asks for confirmation when user want to publish', () => {
  mountAndPressPublish();
});


it('shows a loading dialog while publishing', () => {
  JobsService.publish = jest.fn();
  const wrapper = mountAndPressPublishAndConfirm();

  expect(JobsService.publish).toHaveBeenCalled();
  expect(wrapper.find(PublishingModal).prop('show')).toBe(true);
});

it('shows a success dialog when a job gets published', async () => {
  JobsService.publish = jest.fn(() => new Promise(resolve => resolve()));
  const wrapper = mountAndPressPublishAndConfirm();

  // Update two times because in the component the state gets updates two times (publishing state and published state)
  await wrapper.update();
  await wrapper.update();

  expect(JobsService.publish).toHaveBeenCalled();
  expect(wrapper.find(PublishingModal).prop('show')).toBe(false);
  expect(wrapper.find(PublishedModal).prop('show')).toBe(true);
});

it('shows an error dialog when an error happens when publishing a job', async () => {
  JobsService.publish = jest.fn(() => new Promise((resolve, reject) => reject()));
  const wrapper = mountAndPressPublishAndConfirm();

  // Update two times because in the component the state gets updates two times (publishing state and published state)
  await wrapper.update();
  await wrapper.update();

  expect(JobsService.publish).toHaveBeenCalled();
  expect(wrapper.find(PublishingModal).prop('show')).toBe(false);
  expect(wrapper.find(PublishFailedModal).prop('show')).toBe(true);
});
