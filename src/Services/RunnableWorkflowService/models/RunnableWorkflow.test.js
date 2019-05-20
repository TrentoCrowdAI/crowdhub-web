import RunnableWorkflow from "./RunnableWorkflow";
import BlockRun, {RunStates} from "./BlockRun";
import Runs from "./Runs";
import Run from "./Run";

const {FAILED, RUNNING} = RunStates;


const workflow = {
  graph: {
    nodes: [{
      id: 'a'
    }, {
      id: 'b'
    }, {
      id: 'c'
    }]
  }
};

createTest(
  workflow,
  new Runs([]),
  {
    wasStarted: false,
    isRunning: false,
    isFailed: false,
    isFinished: true,
    runnableBlocksCount: 3,
    finishedCount: 0,
    runningCount: 0
  }
);

createTest(
  workflow,
  new Runs([
    new Run(1, [
      new BlockRun(RUNNING, 1, 1, 'a')
    ])
  ]),
  {
    wasStarted: true,
    isRunning: true,
    isFailed: false,
    isFinished: false,
    runnableBlocksCount: 3,
    finishedCount: 0,
    runningCount: 1
  }
);

createTest(
  workflow,
  new Runs([
    new Run(1, [
      new BlockRun(FAILED, 1, 1, 'a')
    ])
  ]),
  {
    wasStarted: true,
    isRunning: false,
    isFailed: true,
    isFinished: false,
    runnableBlocksCount: 3,
    finishedCount: 0,
    runningCount: 0
  }
);


function createTest(workflow, runs, expected) {

  it('wasStarted()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const wasStarted = runnable.wasStarted();

    // then
    expect(wasStarted).toBe(expected.wasStarted);
  });

  it('isRunning()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const running = runnable.isRunning();

    // then
    expect(running).toBe(expected.isRunning);
  });

  it('isFailed()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const failed = runnable.isFailed();

    // then
    expect(failed).toBe(expected.isFailed);
  });

  it('getFinishedBlocksCount()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const finishedBlocks = runnable.getFinishedBlocksCount();

    // then
    expect(finishedBlocks).toBe(expected.finishedCount);
  });

  it('getRunningBlocksCount()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const running = runnable.getRunningBlocksCount();

    // then
    expect(running).toBe(expected.runningCount);
  });
}

