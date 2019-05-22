import {RunStates} from "../models/BlockRun";

const {FAILED, RUNNING, FINISHED, NOT_STARTED} = RunStates;

export class DoBlockRunAdapter {

  blockId;
  publishRun;
  waitRun;

  constructor(run, blockId) {
    this.blockId = blockId;
    this.publishRun = DoBlockRunAdapter._getBlockRunOrNotStarted(run, blockId);
    this.waitRun = DoBlockRunAdapter._getBlockRunOrNotStarted(run, `${blockId}_wait`);
  }

  static _getBlockRunOrNotStarted = (run, blockId) => run.getBlockRun(blockId) || {getState: () => NOT_STARTED};

  static adaptRuns(runs, blockId) {
    return runs.runs.map(run => new DoBlockRunAdapter(run, blockId));
  }

  getBlockId = () => this.blockId;

  getRunId = () => this.publishRun.getRunId();

  getCacheId = () => this.publishRun.getCacheId();

  isRunning = () => this.publishRun.getState() === RUNNING || this.waitRun.getState() === RUNNING;

  isFailed = () => this.publishRun.getState() === FAILED || this.waitRun.getState() === FAILED;

  isFinished = () => this.publishRun.getState() === FINISHED && this.waitRun.getState() === FINISHED;

}
