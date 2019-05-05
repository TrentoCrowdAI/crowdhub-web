export default class Runs {

  runs;

  constructor(runs) {
    this.runs = runs;
  }

  getLatestRun = () => this.runs[0];

  containsRun = (id) => this.runs.find(run => run.getId() === id) != null;

  getBlockRuns = (blockId) => this.runs.map(run => run.getBlockRun(blockId)).filter(blockRun => !!blockRun);

  getFinishedRuns = () => this.runs.filter(run => run.isFinished());
}
