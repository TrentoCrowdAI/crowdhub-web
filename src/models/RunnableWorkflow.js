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

  notifyRunsListeners = () => this.runsListeners.forEach(listener => listener(this));

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
  wasStarted = () => !!this.getRuns().getLatestRun();


  isRunning = () => this.wasStarted() && this.getRuns().getLatestRun().isRunning();

  isFailed = () => this.wasStarted() && this.getRuns().getLatestRun().isFailed();

  isFinished = () => this.wasStarted() && this.getRuns().getLatestRun().isFinished();

  /**
   * @returns {number} number of blocks that may start in a run
   */
  getRunnableBlocksCount = () => this.getWorkflow().graph.nodes.length;

  /**
   * Relative to latest run
   * @returns {number} number of blocks that are running
   */
  getRunningBlocksCount = () => this.wasStarted() ? this.getRuns().getLatestRun().getRunningBlockRuns().length : 0;

  /**
   * Relative to latest run
   * @returns {number} number of finished blocks
   */
  getFinishedBlocksCount = () => this.wasStarted() ? this.getRuns().getLatestRun().getFinishedBlockRuns().length : 0;

  canStart = () => !this.isRunning();

  canBeEdited = () => !this.isRunning();




  getLatestRun = () => this.getRuns().getLatestRun();
  getFinishedRuns=()=>this.getRuns().getFinishedRuns();
}
