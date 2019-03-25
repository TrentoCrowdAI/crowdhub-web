import React from 'react';
import OutputOpenQuestion from "./OutputOpenQuestion";
import {mount} from "enzyme";
import {
  expectCheckboxToHaveValue,
  expectInputToHaveValue,
  expectSelectToHaveValue
} from "../../../../../../testHelpers/inputs";

it('renders the block with the specified data', () => {
  const data = {
    id: '1',
    type: OutputOpenQuestion.blockTypeName,
    expanded: true,

    question: 'question_value',
    csvVariable: 'csvVariable_value',
    required: false,
    size: 'big'
  };

  const wrapper = mount(
    <OutputOpenQuestion.Component data={data}/>
  );

  expectInputToHaveValue(wrapper, 'question', data.question);
  expectInputToHaveValue(wrapper, 'csvVariable', data.csvVariable);
  expectSelectToHaveValue(wrapper, 'size', data.size);
  expectCheckboxToHaveValue(wrapper, 'required', data.required);
});


it("renders the block with empty field when data have missing fields", () => {
  const data = {
    id: '1',
    type: OutputOpenQuestion.blockTypeName,
    expanded: true
  };

  const wrapper = mount(
    <OutputOpenQuestion.Component data={data}/>
  );

  expectInputToHaveValue(wrapper, 'question', '');
  expectInputToHaveValue(wrapper, 'csvVariable', '');
  expectSelectToHaveValue(wrapper, 'size', 'slim');
  expectCheckboxToHaveValue(wrapper, 'required', false);
});

// TODO: Validation tests
