import React from 'react';
import {mount, shallow} from "enzyme";
import {
  FetchingProjects,
  FetchProjectsError,
  NoProjects,
  ProjectsList,
  ProjectsTable,
  ProjectsTableRow
} from "./ProjectsList";
import {MemoryRouter} from "react-router-dom";
import ProjectsService from "../../../Services/ProjectsService";
import mockedProjects from "../../../mock-data/projects";

describe("should fetch the list of projects", () => {

  async function mountProjectsList() {
    return await mount(
      <MemoryRouter initialEntries={['projects']}>
        <ProjectsList match={{url: '/projects'}}/>
      </MemoryRouter>
    )
  }

  function mockGetProjectsToReturn(result) {
    const getProjects = jest.fn(() => new Promise(resolve => resolve(result)));
    ProjectsService.getProjects = getProjects;
    return getProjects;
  }

  function mockGetProjectsToFail() {
    const getProjects = jest.fn(() => new Promise(() => {
      throw new Error("can't fetch projects");
    }));
    ProjectsService.getProjects = getProjects;
    return getProjects;
  }


  it('shows a loading message while loading', async () => {
    const getProjects = mockGetProjectsToReturn([]);
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();
    expect(wrapper.find(FetchingProjects).length).toBe(1);

  });

  it('shows a loading message while loading', async () => {
    const getProjects = mockGetProjectsToReturn([]);
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(NoProjects).length).toBe(1);
  });


  it('shows the list of projects after loading', async () => {
    const getProjects = mockGetProjectsToReturn(mockedProjects);
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(ProjectsTable).length).toBe(1);
  });

  test.skip("shows an error if projects can't be loaded", async () => {
    const getProjects = mockGetProjectsToFail();
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();

    wrapper.update();

    expect(wrapper.find(FetchProjectsError).length).toBe(1);
  });
});

describe('table should show project data', () => {


  it('renders a row for each project', () => {
    const wrapper = shallow(<ProjectsTable projects={mockedProjects}/>);

    expect(wrapper.find(ProjectsTableRow).length).toEqual(mockedProjects.length);
  });

});

