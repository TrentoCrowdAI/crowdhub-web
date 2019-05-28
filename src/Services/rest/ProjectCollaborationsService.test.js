import ProjectCollaborations, {ProjectCollaborationToJSON} from "./ProjectCollaborationsService";
import {expectFetchToHaveBeenCalledWith, mockFetchToReturnJson} from "../../testHelpers/services";
import {API_URL} from "../../config";
import {serverProjectCollaborations, serviceProjectCollaborations} from "../../mock-data/project-collaborations";

describe('get collaborations of a project', () => {
  it('should send a GET to /project-collaborations/:id', async () => {
    // given
    mockFetchToReturnJson(serverProjectCollaborations);

    // when
    const collaborations = await ProjectCollaborations.getCollaborationsOfProject(1);

    // then
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/project-collaborations?projectId=1`, undefined);
    expect(collaborations).toEqual(serviceProjectCollaborations);
  });
});

describe('add a collaboration to a project', () => {
  it('should send a POST to /project-collaborations', async () => {
    // given
    const projectId = 2;
    const userId = 3;
    const expectedCollaboration = {id: 1, projectId, userId};
    mockFetchToReturnJson(ProjectCollaborationToJSON(expectedCollaboration));

    // when
    const collaboration = await ProjectCollaborations.createCollaboration(projectId, userId);

    // then
    expectFetchToHaveBeenCalledWith(`${API_URL}/project-collaborations`, 'POST', {
      id_project: projectId,
      id_user: userId
    });
    expect(collaboration).toEqual(expectedCollaboration);
  });
});

describe('delete a collaboration', () => {
  it('should send a DELETE to /project-collaborations/:id', async () => {
    // given
    const collabortionId = 1;

    // when
    await ProjectCollaborations.deleteCollaboration(collabortionId);

    // then
    expectFetchToHaveBeenCalledWith(`${API_URL}/project-collaborations/1`, 'DELETE');
  });
});
