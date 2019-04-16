import React from 'react';
import {DeleteButtonAndModal, DeleteModal} from "./DeleteButtonAndModal";
import {mount} from "enzyme";
import {expectComponent} from "../../testHelpers/components";

const mountButton = () => mount(<DeleteButtonAndModal/>);

const mountModal = () => {
  const onDeleted = jest.fn();
  const serviceCall = jest.fn();

  const wrapper = mount(<DeleteModal show={true} onDeleted={onDeleted} serviceCall={serviceCall} onCancel={() => {}}/>);

  return {wrapper, onDeleted, serviceCall};
};

test('show show the modal when the user click on the delete icon', () => {
  const wrapper = mountButton();

  wrapper.find('a.delete').simulate('click');

  expectComponent(wrapper, DeleteModal);
});

test('calls the service method when the user confirm the deletion', () => {
  const {wrapper, serviceCall} = mountModal();

  wrapper.find('button.confirm').simulate('click');
  wrapper.update();

  expect(serviceCall).toHaveBeenCalled();
});
