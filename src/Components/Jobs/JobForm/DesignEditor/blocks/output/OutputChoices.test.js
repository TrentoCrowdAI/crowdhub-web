import React from 'react';
import OutputChoices from "./OutputChoices";
import {mount} from "enzyme";
import {
  expectCheckboxToHaveValue,
  expectInputToHaveValue,
  expectSelectToHaveValue
} from "../../../../../../testHelpers/inputs";

it('renders the block with the specified data', () => {
  const data = {
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

  const wrapper = mount(
    <OutputChoices.Component data={data}/>
  );

  expectInputToHaveValue(wrapper, 'question', data.question);
  expectInputToHaveValue(wrapper, 'csvVariable', data.csvVariable);
  expectSelectToHaveValue(wrapper, 'choice_type', data.choice_type);
  expectCheckboxToHaveValue(wrapper, 'required', data.required);
  // TODO: Check if the choices are displayed in the table
});


it("renders the block with empty field when data have missing fields", () => {
  const data = {
    id: '1',
    type: OutputChoices.blockTypeName,
    expanded: true
  };

  const wrapper = mount(
    <OutputChoices.Component data={data}/>
  );

  expectInputToHaveValue(wrapper, 'question', '');
  expectInputToHaveValue(wrapper, 'csvVariable', '');
  expectSelectToHaveValue(wrapper, 'choice_type', 'multiple_checkbox');
  expectCheckboxToHaveValue(wrapper, 'required', false);
});

// TODO: Validation tests

