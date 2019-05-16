import {WorkflowGraphEngine} from "../WorkflowGraphEngine";
import WorkflowGraphModel from "./WorkflowGraphModel";
import {DefaultBlockNodeModel} from "./DefaultBlockNodeModel";
import BlockRun, {RunStates} from "../../../../../../models/BlockRun";
import Runs from "../../../../../../models/Runs";
import Run from "../../../../../../models/Run";

const {RUNNING, FINISHED} = RunStates;

const workflow = {
  graph: {
    nodes: [
      {
        id: 'a',
        type: 'lambda',
        ports: [{id: 'a_in', name: 'in', type: 'default'}, {id: 'a_out', name: 'out', type: 'default'}]
      },
      {
        id: 'b',
        type: 'lambda',
        ports: [{id: 'b_in', name: 'in', type: 'default'}, {id: 'b_out', name: 'out', type: 'default'}]
      },
      {
        id: 'c',
        type: 'lambda',
        ports: [{id: 'c_in', name: 'in', type: 'default'}, {id: 'c_out', name: 'out', type: 'default'}]
      },
    ],
    links: [
      {id: 'a-b', source: 'a_out', target: 'b_in', type: 'default'},
      {id: 'b-c', source: 'b_out', target: 'c_in', type: 'default'}
    ]
  }
};

const engine = new WorkflowGraphEngine([{
  name: 'lambda',
  parameterDefinitions: []
}]);
const graphModel = new WorkflowGraphModel();
engine.setDiagramModel(graphModel);

const block = new DefaultBlockNodeModel();
block.deSerialize(workflow.graph.nodes[2], engine);


createTest(
  block,
  new Runs([]),
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
  block,
  new Runs([
    new Run(1, [
      new BlockRun(RUNNING, 1, 1, 'c')
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
  block,
  new Runs([
    new Run(1, [
      new BlockRun(RUNNING, 1, 1, 'a')
    ])
  ]),
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
  block,
  new Runs([
    new Run(1, [
      new BlockRun(FINISHED, 1, 1, 'c')
    ])
  ]),
  {
    wasStarted: true,
    isRunning: false,
    isFailed: false,
    isFinished: true,
    runnableBlocksCount: 3,
    finishedCount: 1,
    runningCount: 0
  }
);



function createTest(block, runs, expected) {

  it('wasStarted()', () => {
    // given
    block.setRuns(runs);

    // when
    const wasStarted = block.wasStarted();

    // then
    expect(wasStarted).toBe(expected.wasStarted);
  });

  it('isRunning()', () => {
    // given
    block.setRuns(runs);

    // when
    const running = block.isRunning();

    // then
    expect(running).toBe(expected.isRunning);
  });

  it('isFailed()', () => {
    // given
    block.setRuns(runs);

    // when
    const failed = block.isFailed();

    // then
    expect(failed).toBe(expected.isFailed);
  });

  it('getFinishedBlocksCount()', () => {
    // given
    block.setRuns(runs);

    // when
    const finishedBlocks = block.getFinishedBlocksCount();

    // then
    expect(finishedBlocks).toBe(expected.finishedCount);
  });

  it('getRunningBlocksCount()', () => {
    // given
    block.setRuns(runs);

    // when
    const running = block.getRunningBlocksCount();

    // then
    expect(running).toBe(expected.runningCount);
  });
}
