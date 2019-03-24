import mockedJobs from '../mock-data/jobs';
import JobsService, {APP_URL} from "./JobsService";

function mockFetchToReturnJson(object) {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Promise(resolve => resolve({
      status: 200,
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

describe('get a single job', function () {
  it('should send a GET to /jobs/:id and return the job', async () => {
    const job = mockedJobs[0];
    mockFetchToReturnJson(job);
    const res = await JobsService.getJob(job.id);

    expect(fetch).toHaveBeenCalled();
    expect(res).toEqual(job);
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
      body: JSON.stringify(job)
    });
  });
});


describe('delete a job', () => {
  it('should send a PUT to/job/:id', async () => {
    const job = mockedJobs[0];
    mockFetchToReturnJson(mockedJobs);
    await JobsService.deleteJob(job);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/jobs/${job.id}`, {method: 'DELETE'});
  });
});
