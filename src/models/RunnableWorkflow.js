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

  wasStarted = () => !!this.getLatestRun();

  isLatestRunRunning = () =>
    Object.values(this.getLatestRun().blocks)
      .find(blockRun => blockRun.state === 'running') != null;

  isLatestRunRuntimeError = () =>
    Object.values(this.getLatestRun().blocks)
      .find(blockRun => blockRun.state === 'runtimeError') != null;

  isLatestRunFinished = () => RunnableWorkflow.isRunFinished(this.getLatestRun());

  getFinishedRunsCount = () => this.getFinishedRuns().length;

  getFinishedRuns = () => this.getRuns().filter(RunnableWorkflow.isRunFinished);

  static isRunFinished = (run) =>
    Object.values(run.blocks)
      .find(blockRun => blockRun.state !== 'finished') == null;
}
