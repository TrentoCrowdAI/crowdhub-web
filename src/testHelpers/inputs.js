function expectElementToHaveAttribute (element, attributeName, attributeValue) {
  expect(element.prop(attributeName)).toEqual(attributeValue);
}

export function expectElementToHaveValue (element, value) {
  expectElementToHaveAttribute(element, 'value', value);
}

export function expectInputToHaveValue (wrapper, field, value) {
  expectElementToHaveValue(wrapper.find(`input[name="${field}"]`), value);
}

export function expectTextAreaToHaveValue (wrapper, field, value) {
  expectElementToHaveValue(wrapper.find(`textarea[name="${field}"]`), value);
}

export function expectCheckboxToHaveValue (wrapper, field, checked) {
  expectElementToHaveAttribute(wrapper.find(`input[name="${field}"]`), 'checked', checked);
}

export function expectSelectToHaveValue (wrapper, field, value) {
  expectElementToHaveValue(wrapper.find(`select[name="${field}"]`), value);
}

export const simulateBlurOnAnInput = wrapper => wrapper.find('input').first().simulate('blur');
