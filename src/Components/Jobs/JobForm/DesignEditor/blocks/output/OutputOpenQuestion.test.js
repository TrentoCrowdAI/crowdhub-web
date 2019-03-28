import React from 'react';
import OutputOpenQuestion from "./OutputOpenQuestion";
import {mount} from "enzyme";
import {
  expectCheckboxToHaveValue,
  expectInputToHaveValue,
  expectSelectToHaveValue, simulateBlurOnAnInput
} from "../../../../../../testHelpers/inputs";
import {objectClonerWithoutField} from "../../../../../../testHelpers/objects";

const validData = {
  id: '1',
  type: OutputOpenQuestion.blockTypeName,
  expanded: true,

  question: 'question_value',
  csvVariable: 'csvVariable_value',
  required: false,
  size: 'big'
};

const mountBlock = data => mount(
  <OutputOpenQuestion.Component data={data} onChange={() => null}/>
);

it('renders the block with the specified data', () => {
  const wrapper = mountBlock(validData);

  expectInputToHaveValue(wrapper, 'question', validData.question);
  expectInputToHaveValue(wrapper, 'csvVariable', validData.csvVariable);
  expectSelectToHaveValue(wrapper, 'size', validData.size);
  expectCheckboxToHaveValue(wrapper, 'required', validData.required);
});

const validDataWithoutField = objectClonerWithoutField(validData);

const expectInvalidWithoutField = fieldName => {
  const wrapper = mountBlock(validDataWithoutField(fieldName));

  simulateBlurOnAnInput(wrapper);

  expect(wrapper.state('valid')).toBe(false);
};


it("renders the block with empty field when data have missing fields", () => {
  const wrapper = mountBlock({
    id: '1',
    type: OutputOpenQuestion.blockTypeName,
    expanded: true
  });

  expectInputToHaveValue(wrapper, 'question', '');
  expectInputToHaveValue(wrapper, 'csvVariable', '');
  expectSelectToHaveValue(wrapper, 'size', 'slim');
  expectCheckboxToHaveValue(wrapper, 'required', false);
});


describe('test the validation', () => {
  it('is invalid if the csvVariable is missing', () =>
    expectInvalidWithoutField('csvVariable'));
});
