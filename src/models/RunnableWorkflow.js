export const RunStates = Object.freeze({
  RUNTIME_ERROR: 'runtimeError',
  RUNNING: 'running',
  FINISHED: 'finished'
});

const {RUNTIME_ERROR, RUNNING, FINISHED} = RunStates;

export default class RunnableWorkflow {

  workflow;
  runs;
  runsListeners = [];

  constructor(workflow, runs) {
    this.workflow = workflow;
    this.runs = runs;
  }

  getWorkflow = () => this.workflow;

  setWorkflow = (workflow) => this.workflow = workflow;

  getRuns = () => this.runs;

  setRuns = (runs) => {
    this.runs = runs;
    this.notifyRunsListeners();
  };

  notifyRunsListeners = () => this.runsListeners.forEach(listener => listener(this.getLatestRun(), this.getRuns()));

  getLatestRun = () => this.runs[0];

  addRunsListener = (listener) => this.runsListeners.push(listener);

  removeRunsListener = (listener) => {
    const index = this.runsListeners.indexOf(listener);
    if (index < 0) {
      throw new Error("can't remove a listener that hasn't been added");
    }
    this.runsListeners.splice(index, 1);
  };

  /**
   * @returns {boolean} true if the block was started at least one time.
   */
  wasStarted = () => !!this.getLatestRun();

  isLatestRunRunning = () => this.getRunningBlocksOfLatestRun().length > 0;

  getRunningBlocksOfLatestRun = () =>
    Object.values(this.getLatestRun().blocks)
      .filter(blockRun => blockRun.state === RUNNING);

  isLatestRunRuntimeError = () =>
    Object.values(this.getLatestRun().blocks)
      .find(blockRun => blockRun.state === RUNTIME_ERROR) != null;

  isLatestRunFinished = () => RunnableWorkflow.isRunFinished(this.getLatestRun());

  static isRunFinished = (run) =>
    Object.values(run.blocks)
      .find(blockRun => blockRun.state !== FINISHED) == null;

  getFinishedRunsCount = () => this.getFinishedRuns().length;

  getFinishedRuns = () => this.getRuns().filter(RunnableWorkflow.isRunFinished);

  /**
   * @returns {number} number of blocks that may start in a run
   */
  getRunnableBlocksCount = () => this.getWorkflow().graph.nodes.length;

  /**
   * Relative to latest run
   * @returns {number} number of blocks that are running
   */
  getRunningBlocksCount = () => this.getRunningBlocksOfLatestRun().length;

  /**
   * Relative to latest run
   * @returns {number} number of finished blocks
   */
  getFinishedBlocksCount = () =>
    Object.values(this.getLatestRun().blocks)
      .filter(blockRun => blockRun.state === FINISHED).length;
}
