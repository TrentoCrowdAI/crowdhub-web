import {getJSON} from "./utils";
import {API_URL} from "../../config";
import {JSONtoWorkflow} from "./WorkflowsService";


const PUBLIC_WORKFLOWS_URL = `${API_URL}/public-workflows`;


export default {

  async getWorkflow(id) {
    const workflow = await getJSON(`${PUBLIC_WORKFLOWS_URL}/${id}`);
    return JSONtoWorkflow(workflow);
  },

}
