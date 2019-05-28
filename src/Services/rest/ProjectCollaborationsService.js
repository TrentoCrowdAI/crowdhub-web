import {getJSON, postJSON, sendDelete} from "./utils";
import {API_URL} from "../../config";

const PROJECT_COLLABORATIONS_URL = `${API_URL}/project-collaborations`;

const JSONToProjectCollaboration = ({id, id_project, id_user}) => ({
  id,
  projectId: id_project,
  userId: id_user
});

export const ProjectCollaborationToJSON = ({id, projectId, userId}) => ({
  id,
  id_project: projectId,
  id_user: userId
});

export default {
  async getCollaborationsOfProject(projectId) {
    const jsonList = await getJSON(`${PROJECT_COLLABORATIONS_URL}?projectId=${projectId}`);
    return jsonList.map(JSONToProjectCollaboration);
  },

  async createCollaboration(projectId, userId) {
    const jsonToSend = ProjectCollaborationToJSON({projectId, userId});
    const receivedJSON = await postJSON(PROJECT_COLLABORATIONS_URL, jsonToSend);
    return JSONToProjectCollaboration(receivedJSON);
  },

  async deleteCollaboration(collaborationId) {
    await sendDelete(`${PROJECT_COLLABORATIONS_URL}/${collaborationId}`);
  }
}
