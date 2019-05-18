import {getJSON} from "./utils";
import {API_URL} from "../../config";
import Run from "../../models/Run";
import BlockRun from "../../models/BlockRun";
import Runs from "../../models/Runs";

const RUNS_URL = `${API_URL}/runs`;

export const JSONtoRun = ({id, data, created_at, id_workflow}) => {
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

  return new Run(id, blockRuns, new Date(created_at), id_workflow);
};

const runsComparator = (a, b) => b.getCreatedAt() - a.getCreatedAt();

export default {

  async getRuns () {
    return await this._getRuns(`${RUNS_URL}`);
  },

  async getRunsOfWorkflow(workflowId) {
    return await this._getRuns(`${RUNS_URL}?workflowId=${workflowId}`);
  },

  async _getRuns(url) {
    const jsonList = await getJSON(url);
    const runs = jsonList.map(JSONtoRun);
    runs.sort(runsComparator);
    return new Runs(runs);
  },

  getDownloadLink(run, format) {
    return `${RUNS_URL}/${run.id}/result?format=${format}`;
  }

}
