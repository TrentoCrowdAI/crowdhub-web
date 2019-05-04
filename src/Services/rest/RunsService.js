import {getJSON} from "./utils";
import {APP_URL} from "../../config";

const RUNS_URL = `${APP_URL}/runs`;

const JSONtoRun = ({id, data}) => ({
  id,
  blocks: data
});

export default {

  async getRunsOfWorkflow(workflowId) {
    const jsonList = await getJSON(`${RUNS_URL}?workflowId=${workflowId}`);
    return jsonList.map(JSONtoRun);
  }

}
