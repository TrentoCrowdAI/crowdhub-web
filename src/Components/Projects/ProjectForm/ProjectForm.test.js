import React from 'react';
import {mount} from "enzyme";

import ProjectForm from "./ProjectForm";
import mockedProjects from '../../../mock-data/projects';
import {expectInputToHaveValue, expectTextAreaToHaveValue} from "../../../testHelpers/inputs";
import {MemoryRouter} from "react-router-dom";


const mountProjectForm = (project) => mount(
  <MemoryRouter>
    <ProjectForm projectData={project}/>
  </MemoryRouter>
);

it('Should initialize the form with previous values', () => {
  const project = mockedProjects[0].data;
  const wrapper = mountProjectForm(project);

  expectInputToHaveValue(wrapper, 'name', project.name);
  expectTextAreaToHaveValue(wrapper, 'description', project.description);
});


it('Should initialize the form with default values if no project specified', () => {
  const wrapper = mountProjectForm();

  expectInputToHaveValue(wrapper, 'name', '');
  expectTextAreaToHaveValue(wrapper, 'description', '');
});

