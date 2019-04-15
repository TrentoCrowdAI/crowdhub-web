export const createMockForServiceMethod = (service, method) => toReturn => {
  const mock = jest.fn(() => new Promise(resolve => resolve(toReturn)));
  service[method] = mock;
  return mock;
};

export const mockFetchToReturnJson = (object) => jest.spyOn(global, 'fetch')
  .mockImplementation(() => {
    return new Promise(resolve => resolve({
      status: 200,
      async json() {
        return object
      }
    }))
  });


