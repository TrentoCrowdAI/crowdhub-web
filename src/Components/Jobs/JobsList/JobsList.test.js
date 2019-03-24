import React from 'react';
import {mount, shallow} from "enzyme";
import {FetchingJobs, JobsList, NoJobs, JobsTable, FetchJobsError, JobsTableRow} from "./JobsList";
import {MemoryRouter} from "react-router-dom";
import JobsService from "../../../Services/JobsService";
import mockedJobs from "../../../mock-data/jobs";

describe("should fetch the list of jobs", () => {

  async function mountJobsList() {
    return await mount(
      <MemoryRouter initialEntries={['jobs']}>
        <JobsList match={{url: '/jobs'}}/>
      </MemoryRouter>
    )
  }

  function mockGetJobsToReturn(result) {
    const getJobs = jest.fn(() => new Promise(resolve => resolve(result)));
    JobsService.getJobs = getJobs;
    return getJobs;
  }

  function mockGetJobsToFail() {
    const getJobs = jest.fn(() => new Promise(() => {
      throw new Error("can't fetch jobs");
    }));
    JobsService.getJobs = getJobs;
    return getJobs;
  }


  it('shows a loading message while loading', async () => {
    const getJobs = mockGetJobsToReturn([]);
    const wrapper = await mountJobsList();

    expect(getJobs).toHaveBeenCalled();
    expect(wrapper.find(FetchingJobs).length).toBe(1);

  });

  it('shows a loading message while loading', async () => {
    const getJobs = mockGetJobsToReturn([]);
    const wrapper = await mountJobsList();

    expect(getJobs).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(NoJobs).length).toBe(1);
  });


  it('shows the list of jobs after loading', async () => {
    const getJobs = mockGetJobsToReturn(mockedJobs);
    const wrapper = await mountJobsList();

    expect(getJobs).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(JobsTable).length).toBe(1);
  });

  test.skip("shows an error if jobs can't be loaded", async () => {
    const getJobs = mockGetJobsToFail();
    const wrapper = await mountJobsList();

    expect(getJobs).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(FetchJobsError).length).toBe(1);
  });
});

describe('table should show jobs data', () => {


  it('renders a row for each job', () => {
    const wrapper = shallow(<JobsTable jobs={mockedJobs}/>);

    expect(wrapper.find(JobsTableRow).length).toEqual(mockedJobs.length);
  });

});

