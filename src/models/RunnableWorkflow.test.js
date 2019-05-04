import RunnableWorkflow, {RunStates} from "./RunnableWorkflow";

const {RUNTIME_ERROR, RUNNING, FINISHED} = RunStates;


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
  [],
  {
    wasStarted: false,
    isRunning: false,
    isFailed: false,
    isFinished: false,
    runnableBlocksCount: 3,
    finishedCount: 0,
    runningCount: 0
  }
);


createTest(
  workflow,
  [{blocks: {}}],
  {
    wasStarted: true,
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
  [{
    blocks: {
      a: {state: RUNNING}
    }
  }],
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
  [{
    blocks: {
      a: {state: RUNTIME_ERROR}
    }
  }],
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

  it('isLatestRunRunning()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const running = runnable.isLatestRunRunning();

    // then
    expect(running).toBe(expected.isRunning);
  });

  it('isLatestRunRuntimeError()', () => {
    // given
    const runnable = new RunnableWorkflow(workflow, runs);

    // when
    const failed = runnable.isLatestRunRuntimeError();

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

