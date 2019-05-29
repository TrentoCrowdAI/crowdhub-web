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


export const expectFetchToHaveBeenCalledWith = (url, method, body) =>
  // TODO: Code below too complex, refactor it
  expect(fetch).toHaveBeenCalledWith(url, method ? {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? {'Content-Type': 'application/json'} : undefined
  } : undefined);
