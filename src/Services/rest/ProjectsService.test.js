import mockedProjects from '../../mock-data/projects';
import ProjectsService from "./ProjectsService";
import {APP_URL} from "../../config";
import {mockFetchToReturnJson} from "../../testHelpers/services";

describe('get list of projects', () => {
  it('should send a GET to /jobs and return the array of projects', async () => {
    mockFetchToReturnJson(mockedProjects);
    const res = await ProjectsService.getProjects();

    expect(fetch).toHaveBeenCalled();
    expect(res).toEqual(mockedProjects);
  });
});

describe('get a single project', function () {
  it('should send a GET to /jobs/:id and return the project', async () => {
    const project = mockedProjects[0];
    mockFetchToReturnJson(project);
    const res = await ProjectsService.getProject(project.id);

    expect(fetch).toHaveBeenCalled();
    expect(res).toEqual(project);
  });
});


describe('create new project', () => {
  it('should send a POST to /projects', async () => {
    const project = mockedProjects[0];
    mockFetchToReturnJson(mockedProjects);
    await ProjectsService.createProject(project);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
  });
});


describe('delete a project', () => {
  it('should send a DELETE to /projects/:id', async () => {
    const project = mockedProjects[0];
    mockFetchToReturnJson(mockedProjects);
    await ProjectsService.deleteProject(project);

    expect(fetch).toHaveBeenCalledWith(`${APP_URL}/projects/${project.id}`, {method: 'DELETE'});
  });
});
