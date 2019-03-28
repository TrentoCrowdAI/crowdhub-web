import React from 'react';
import OutputChoices from "./OutputChoices";
import {mount} from "enzyme";
import {
  expectCheckboxToHaveValue,
  expectInputToHaveValue,
  expectSelectToHaveValue, simulateBlurOnAnInput
} from "../../../../../../testHelpers/inputs";
import {objectClonerWithoutField} from "../../../../../../testHelpers/objects";

const validData = {
  id: '1',
  type: OutputChoices.blockTypeName,
  expanded: true,

  question: 'question_value',
  csvVariable: 'csvVariable_value',
  required: false,
  choice_type: 'single_radio',
  choices: [{
    label: 'Yes',
    value: 'yes'
  }, {
    label: 'Nope',
    value: 'no'
  }]
};

const mountBlock = data => mount(
  <OutputChoices.Component data={data} onChange={() => null}/>
);

it('renders the block with the specified data', () => {
  const wrapper = mountBlock(validData);

  expectInputToHaveValue(wrapper, 'question', validData.question);
  expectInputToHaveValue(wrapper, 'csvVariable', validData.csvVariable);
  expectSelectToHaveValue(wrapper, 'choice_type', validData.choice_type);
  expectCheckboxToHaveValue(wrapper, 'required', validData.required);
  // TODO: Check if the choices are displayed in the table
});


it("renders the block with empty field when data have missing fields", () => {
  const data = {
    id: '1',
    type: OutputChoices.blockTypeName,
    expanded: true
  };

  const wrapper = mountBlock(data);

  expectInputToHaveValue(wrapper, 'question', '');
  expectInputToHaveValue(wrapper, 'csvVariable', '');
  expectSelectToHaveValue(wrapper, 'choice_type', 'multiple_checkbox');
  expectCheckboxToHaveValue(wrapper, 'required', false);
});

const validDataWithoutField = objectClonerWithoutField(validData);

const expectInvalidWithoutField = fieldName => {
  const wrapper = mountBlock(validDataWithoutField(fieldName));

  simulateBlurOnAnInput(wrapper);

  expect(wrapper.state('valid')).toBe(false);
};



// TODO: Validation tests
describe('test the validation', () => {
  it('is invalid if the csvVariable is missing', () =>
    expectInvalidWithoutField('csvVariable'));
});
