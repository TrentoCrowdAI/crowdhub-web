
export const expectComponent = (wrapper, Component) => expect(
  wrapper.find(Component).length
).toBe(1);
