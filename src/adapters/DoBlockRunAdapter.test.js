import BlockRun, {RunStates} from "../models/BlockRun";
import {DoBlockRunAdapter} from "./DoBlockRunAdapter";
import Run from "../models/Run";

const {FAILED, RUNNING, FINISHED, NOT_STARTED} = RunStates;


createTest([
  new Run(1, [
    new BlockRun(RUNNING, 1, null, 'a'),
    new BlockRun(NOT_STARTED, 1, null, 'a_wait')
  ], new Date())
], {
  isRunning: true,
  isFailed: false,
  isFinished: false
});

createTest([
  new Run(1, [
    new BlockRun(FAILED, 1, null, 'a'),
    new BlockRun(NOT_STARTED, 1, null, 'a_wait')
  ], new Date())
], {
  isRunning: false,
  isFailed: true,
  isFinished: false
});

createTest([
  new Run(1, [
    new BlockRun(FINISHED, 1, null, 'a'),
    new BlockRun(RUNNING, 1, null, 'a_wait')
  ], new Date())
], {
  isRunning: true,
  isFailed: false,
  isFinished: false
});

createTest([
  new Run(1, [
    new BlockRun(FINISHED, 1, null, 'a'),
    new BlockRun(FINISHED, 1, null, 'a_wait')
  ], new Date())
], {
  isRunning: false,
  isFailed: false,
  isFinished: true
});


function createTest(runs, expected) {

  it('isRunning()', () => {
    // given
    const adapter = new DoBlockRunAdapter(runs[0], 'a');

    // when
    const isRunning = adapter.isRunning();

    // then
    expect(isRunning).toBe(expected.isRunning);
  });

  it('isFailed()', () => {
    // given
    const adapter = new DoBlockRunAdapter(runs[0], 'a');

    // when
    const isFailed = adapter.isFailed();

    // then
    expect(isFailed).toBe(expected.isFailed);
  });

  it('isFinished()', () => {
    // given
    const adapter = new DoBlockRunAdapter(runs[0], 'a');

    // when
    const isFinished = adapter.isFinished();

    // then
    expect(isFinished).toBe(expected.isFinished);
  });
}
