export const createMockForServiceMethod = (service, method) => toReturn => {
  const mock = jest.fn(() => new Promise(resolve => resolve(toReturn)));
  service[method] = mock;
  return mock;
};
