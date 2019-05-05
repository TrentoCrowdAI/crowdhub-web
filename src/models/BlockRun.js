export const RunStates = Object.freeze({
  FAILED: 'runtimeError',
  RUNNING: 'running',
  FINISHED: 'finished',
  NOT_STARTED: 'not started'
});
const {FAILED, RUNNING, FINISHED} = RunStates;

export default class BlockRun {

  blockId;
  state;
  runId;
  cacheId;

  constructor(state, runId, cacheId, blockId) {
    this.blockId = blockId;
    this.state = state;
    this.runId = runId;
    this.cacheId = cacheId;
  }

  getBlockId = () => this.blockId;

  getState = () => this.state;

  getRunId = () => this.runId;

  getCacheId = () => this.cacheId;

  isRunning = () => this.getState() === RUNNING;

  isFailed = () => this.getState() === FAILED;

  isFinished = () => this.getState() === FINISHED;
}
