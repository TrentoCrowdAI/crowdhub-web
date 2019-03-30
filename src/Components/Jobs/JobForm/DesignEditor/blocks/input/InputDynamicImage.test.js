import React from 'react';
import InputDynamicImage from "./InputDynamicImage";
import {mount} from "enzyme";
import {
  expectCheckboxToHaveValue,
  expectInputToHaveValue,
  simulateBlurOnAnInput
} from "../../../../../../testHelpers/inputs";
import {objectClonerWithoutField} from "../../../../../../testHelpers/objects";

const validData ={
  id: '1',
  type: InputDynamicImage.blockTypeName,
  expanded: true,

  csvVariable: 'csvVariable_value',
  highlightable: true,
  question: 'question_value',
  highlightedCsvVariable: 'highlightedCsvVariable_value'
};

const mountBlock = data => mount(
  <InputDynamicImage.Component data={data} onChange={() => null}/>
);

it('renders the block with the specified data', () => {
  const wrapper = mountBlock(validData);

  expectInputToHaveValue(wrapper, 'csvVariable', validData.csvVariable);
  expectCheckboxToHaveValue(wrapper, 'highlightable', true);
  expectInputToHaveValue(wrapper, 'question', validData.question);
  expectInputToHaveValue(wrapper, 'highlightedCsvVariable', validData.highlightedCsvVariable);
});


it("renders the block with empty field when data have missing fields", () => {
  const data = {
    id: '1',
    type: InputDynamicImage.blockTypeName,
    expanded: true
  };

  const wrapper = mountBlock(data);

  expectInputToHaveValue(wrapper, 'csvVariable', '');
  expectCheckboxToHaveValue(wrapper, 'highlightable', false);

});

const validDataWithoutField = objectClonerWithoutField(validData);

const expectInvalidWithoutField = fieldName => {
  const wrapper = mountBlock(validDataWithoutField(fieldName));

  simulateBlurOnAnInput(wrapper);

  expect(wrapper.state('valid')).toBe(false);
};

describe('test the validation', () => {
  it('is valid if all the fields are not empty', () => {
    const wrapper = mountBlock(validData);

    simulateBlurOnAnInput(wrapper);

    expect(wrapper.state('valid')).toBe(true);
  });


  it('is invalid if the csvVariable is missing', () =>
    expectInvalidWithoutField('csvVariable'));


  it("is valid if the question is empty but it isn't highlightable", () => {
    const noQuestion = validDataWithoutField('question');
    noQuestion.highlightable = false;
    const wrapper = mountBlock(noQuestion);

    simulateBlurOnAnInput(wrapper);

    expect(wrapper.state('valid')).toBe(true);
  });

  it("is valid if the csvHighlightVariable is empty but it isn't highlightable", () => {
    const noQuestion = validDataWithoutField('highlightedCsvVariable');
    noQuestion.highlightable = false;
    const wrapper = mountBlock(noQuestion);

    simulateBlurOnAnInput(wrapper);

    expect(wrapper.state('valid')).toBe(true);
  });

  it("is invalid if the csvHighlightVariable is empty and highlightable", () =>
    expectInvalidWithoutField('highlightedCsvVariable'));

  it("is invalid if the question is empty and highlightable", () =>
    expectInvalidWithoutField('question'));
});
