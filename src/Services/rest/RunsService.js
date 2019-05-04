import {getJSON} from "./utils";
import {APP_URL} from "../../config";

const RUNS_URL = `${APP_URL}/runs`;

const JSONtoRun = ({id, data}) => {
  const blockRuns = data;
  Object.keys(blockRuns).forEach(blockId => {
    blockRuns[blockId].cacheId = blockRuns[blockId].id_cache;
    delete blockRuns[blockId].id_cache;
  });
  return {
    id,
    blocks: blockRuns
  };
};

export default {

  async getRunsOfWorkflow(workflowId) {
    const jsonList = await getJSON(`${RUNS_URL}?workflowId=${workflowId}`);
    return jsonList.map(JSONtoRun);
  }

}
