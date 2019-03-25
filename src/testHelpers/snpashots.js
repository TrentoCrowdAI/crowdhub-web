import renderer from "react-test-renderer";

export const expectToMatchSnapshot = component => expect(
  renderer.create(component).toJSON()
).toMatchSnapshot();
