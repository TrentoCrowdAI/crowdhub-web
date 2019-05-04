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
  }

}
