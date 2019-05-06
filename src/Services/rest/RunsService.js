import {getJSON} from "./utils";
import {API_URL} from "../../config";
import Run from "../../models/Run";
import BlockRun from "../../models/BlockRun";
import Runs from "../../models/Runs";

const RUNS_URL = `${API_URL}/runs`;

export const JSONtoRun = ({id, data, created_at}) => {
  const blockRuns = [];
  Object.keys(data).forEach(blockId => {
    const blockRun = data[blockId];

    blockRuns.push(new BlockRun(
      blockRun.state,
      id,
      blockRun.id_cache,
      blockId
    ));
  });

  return new Run(id, blockRuns, new Date(created_at)); // TODO: Is the id duplicated?
};

const runsComparator = (a, b) => b.getCreatedAt() - a.getCreatedAt();

export default {

  async getRunsOfWorkflow(workflowId) {
    const jsonList = await getJSON(`${RUNS_URL}?workflowId=${workflowId}`);
    const runs = jsonList.map(JSONtoRun);
    runs.sort(runsComparator);
    return new Runs(runs);
  },

  getDownloadLink(run) {
    return `${RUNS_URL}/${run.id}/result?format=csv`;
  }
}
