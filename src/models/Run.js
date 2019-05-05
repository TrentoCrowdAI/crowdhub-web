export default class Run {

  id;
  blockRuns;
  createdAt;

  constructor(id, blockRuns, createdAt) {
    this.id = id;
    this.blockRuns = blockRuns;
    this.createdAt = createdAt;
  }

  getId = () => this.id;

  getRunId = () => this.getId();

  getBlockRuns = () => this.blockRuns;

  getBlockRun = (blockId) => this.getBlockRuns().find(blockRun => blockRun.getBlockId() === blockId);

  getCreatedAt = () => this.createdAt;

  isRunning = () => this.getRunningBlockRuns().length > 0;

  getRunningBlockRuns = () => this.getBlockRuns().filter(blockRun => blockRun.isRunning());

  isFailed = () => this.getFailedBlockRuns().length > 0;

  getFailedBlockRuns = () => this.getBlockRuns().filter(blockRun => blockRun.isFailed());

  isFinished = () => this.getFinishedBlockRuns().length === this.getBlockRuns().length;

  getFinishedBlockRuns = () => this.getBlockRuns().filter(blockRun => blockRun.isFinished());
}
