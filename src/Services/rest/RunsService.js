import {getJSON} from "./utils";
import {API_URL} from "../../config";

const RUNS_URL = `${API_URL}/runs`;

const JSONtoRun = ({id, data, created_at}) => {
  const blockRuns = data;
  Object.keys(blockRuns).forEach(blockId => {
    blockRuns[blockId].cacheId = blockRuns[blockId].id_cache;
    delete blockRuns[blockId].id_cache;
  });
  return {
    createdAt: new Date(created_at),
    id,
    blocks: blockRuns
  };
};

const runsComparator = (a, b) => b.createdAt - a.createdAt;

export default {

  async getRunsOfWorkflow(workflowId) {
    const jsonList = await getJSON(`${RUNS_URL}?workflowId=${workflowId}`);
    const runs = jsonList.map(JSONtoRun);
    runs.sort(runsComparator);
    return runs;
  },

  getDownloadLink(run) {
    return `${RUNS_URL}/${run.id}/result?format=csv`;
  }
}
