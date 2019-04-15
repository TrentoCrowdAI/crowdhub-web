import ProjectsService from '../../../Services/ProjectsService';
import {mount} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import CreateProject, {ProjectCreationFailed} from "./CreateProject";
import {expectComponent} from "../../../testHelpers/components";

function mockCreateProjectToFail() {
  const createProject = jest.fn(() => new Promise(() => {
    throw new Error("can't create project");
  }));
  ProjectsService.createProject = createProject;
  return createProject;
}

const mountCreateProject = () => mount(
  <MemoryRouter>
    <CreateProject/>
  </MemoryRouter>
);


it("should show an error if the project can't be created", async () => {
  const createProject = mockCreateProjectToFail();
  const wrapper = await mountCreateProject();
  const createProjectComponent = wrapper.find(CreateProject).instance();
  const projectData = {
    name: 'name',
    description: 'my project'
  };

  await createProjectComponent.handleProjectSubmission(projectData, {setSubmitting: () => null});
  wrapper.update();

  expect(createProject).toHaveBeenCalled();
  expectComponent(wrapper, ProjectCreationFailed);
});
