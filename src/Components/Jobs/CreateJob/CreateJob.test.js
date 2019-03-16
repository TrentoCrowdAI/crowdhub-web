
function mockCreateJobToFail() {
  const createJob = jest.fn(() => new Promise(() => {
    throw new Error("can't create jobs");
  }));
  JobsService.createJob = createJob;
  return createJob;
}


function mockCreateJob() {
  const createJob = jest.fn(() => new Promise(resolve => resolve({})));
  JobsService.createJob = createJob;
  return createJob;
}
