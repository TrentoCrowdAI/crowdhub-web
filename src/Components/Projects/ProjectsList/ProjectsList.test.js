import React from 'react';
import {mount, shallow} from "enzyme";
import {FetchingProjects, FetchProjectsError, ProjectsList} from "./ProjectsList";
import {MemoryRouter} from "react-router-dom";
import ProjectsService from "../../../Services/rest/ProjectsService";
import mockedProjects from "../../../mock-data/projects";
import {ProjectsTable, ProjectsTableRow} from "./ProjectsTable";
import {expectComponent} from "../../../testHelpers/components";

describe("should show the list of projects", () => {

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
    expectComponent(wrapper, FetchingProjects);

  });


  it('shows the list of projects after loading', async () => {
    const getProjects = mockGetProjectsToReturn(mockedProjects);
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();

    wrapper.update();

    expectComponent(wrapper, ProjectsTable);
  });

  test.skip("shows an error if projects can't be loaded", async () => {
    const getProjects = mockGetProjectsToFail();
    const wrapper = await mountProjectsList();

    expect(getProjects).toHaveBeenCalled();

    wrapper.update();

    expectComponent(wrapper, FetchProjectsError);
  });
});

describe('table should show project data', () => {


  it('renders a row for each project', () => {
    const wrapper = shallow(<ProjectsTable projects={mockedProjects}/>);

    expect(wrapper.find(ProjectsTableRow).length).toEqual(mockedProjects.length);
  });

});

