import mockedJobs from '../mock-data/jobs';
import JobsService, {APP_URL} from "./JobsService";

function mockFetchToReturnJson(object) {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Promise(resolve => resolve({
      async json() {
        return object
      }
    }))
  });
}

describe('get list of jobs', () => {
  it('should send a GET to /jobs and return the array of jobs', async () => {
    mockFetchToReturnJson(mockedJobs);
    const res = await JobsService.getJobs();

    expect(fetch).toHaveBeenCalled();
    expect(res).toEqual(mockedJobs);
  });
});

describe('create new job', () => {
  it('should send a POST to /job', async () => {
    const job = mockedJobs[0];
    mockFetchToReturnJson(mockedJobs);
    await JobsService.createJob(job);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: job})
    });
  });
});
