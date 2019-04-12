import ProjectsService from '../../../Services/ProjectsService';
import {mount} from "enzyme";
import EditProject from "./EditProject";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import {createMockForServiceMethod} from "../../../testHelpers/services";
import mockedProjects from '../../../mock-data/projects';

function mockUpdateProjectToFail() {
  const updateProject = jest.fn(() => new Promise(() => {
    throw new Error("can't update project");
  }));
  ProjectsService.updateProject = updateProject;
  return updateProject;
}

const mockGetProjectToReturn = createMockForServiceMethod(ProjectsService, 'getProject');

async function mountEditProject() {
  return await mount(
    <MemoryRouter initialEntries={['projects', '1', 'edit']}>
      <EditProject match={{url: '/projects/edit', params: {id: 1}}}/>
    </MemoryRouter>
  )
}



it("should show an error if the project can't be updated", async () => {
  const project = mockedProjects[0];
  mockGetProjectToReturn(project);
  const updateProject = mockUpdateProjectToFail();
  const wrapper = await mountEditProject();

  wrapper.update();
  const editProjectComponent = wrapper.find(EditProject).instance();
  await editProjectComponent.handleProjectSubmission(project.data, {setSubmitting: () => null});

  expect(updateProject).toHaveBeenCalled();
});
