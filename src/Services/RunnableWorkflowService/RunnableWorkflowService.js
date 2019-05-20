import WorkflowsService from "../rest/WorkflowsService";
import RunnableWorkflow from "./models/RunnableWorkflow";
import RunsService from "../rest/RunsService";

const DEFAULT_POLL_INTERVAL = 5000;

export default {

  pollInterval: null,

  async getRunnableWorkflow(workflowId) {
    const [workflow, runs] = await Promise.all([
      WorkflowsService.getWorkflow(workflowId),
      RunsService.getRunsOfWorkflow(workflowId)
    ]);
    return new RunnableWorkflow(workflow, runs);
  },


  startWatchingRunsStatus(runnableWorkflow, pollInterval = DEFAULT_POLL_INTERVAL) {
    if (this.pollInterval != null) {
      throw new Error('multiple watching not implemented yet');
    }
    const workflowId = runnableWorkflow.getWorkflow().id;
    this.pollInterval = setInterval(async () => {
      const runs = await RunsService.getRunsOfWorkflow(workflowId);
      runnableWorkflow.setRuns(runs);
    }, pollInterval);
  },


  stopWatchRunsStatus() {
    clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

}
