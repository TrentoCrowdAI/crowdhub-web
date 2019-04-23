import React from 'react';
import InputStaticText from "./InputStaticText";
import {mount} from "enzyme";

it('renders the block with the specified data', () => {
  const data = {
    id: '1',
    type: InputStaticText.blockTypeName,
    expanded: true,

    text: 'text_value',
  };

  const wrapper = mount(
    <InputStaticText.Component data={data}/>
  );

  expect(wrapper.state('text')).toBe(data.text);
});


it("renders the block with empty field when data have missing fields", () => {
  const data = {
    id: '1',
    type: InputStaticText.blockTypeName,
    expanded: true
  };

  const wrapper = mount(
    <InputStaticText.Component data={data}/>
  );

  expect(wrapper.state('text')).toBe('');
});

