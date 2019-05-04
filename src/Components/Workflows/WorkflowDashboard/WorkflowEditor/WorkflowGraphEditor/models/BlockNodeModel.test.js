import {WorkflowGraphEngine} from "../WorkflowGraphEngine";
import WorkflowGraphModel from "./WorkflowGraphModel";
import {BlockNodeModel} from "./BlockNodeModel";
import {RunStates} from "../../../../../../models/RunnableWorkflow";

const {RUNTIME_ERROR, RUNNING, FINISHED} = RunStates;

const workflow = {
  graph: {
    nodes: [
      {
        id: 'a',
        type: 'do',
        ports: [{id: 'a_in', name: 'in', type: 'default'}, {id: 'a_out', name: 'out', type: 'default'}]
      },
      {
        id: 'b',
        type: 'do',
        ports: [{id: 'b_in', name: 'in', type: 'default'}, {id: 'b_out', name: 'out', type: 'default'}]
      },
      {
        id: 'c',
        type: 'do',
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
  name: 'do',
  parameterDefinitions: []
}]);
const graphModel = new WorkflowGraphModel();
engine.setDiagramModel(graphModel);

const block = new BlockNodeModel();
block.deSerialize(workflow.graph.nodes[2], engine);

createTest(
  block,
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
  block,
  [{id: 1, state: RUNNING}],
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
  [{id: 1, state: FINISHED}],
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
    block.setBlockRuns(runs[0], runs);

    // when
    const wasStarted = block.wasStarted();

    // then
    expect(wasStarted).toBe(expected.wasStarted);
  });

  it('isLatestRunRunning()', () => {
    // given
    block.setBlockRuns(runs[0], runs);

    // when
    const running = block.isLatestRunRunning();

    // then
    expect(running).toBe(expected.isRunning);
  });

  it('isLatestRunRuntimeError()', () => {
    // given
    block.setBlockRuns(runs[0], runs);

    // when
    const failed = block.isLatestRunRuntimeError();

    // then
    expect(failed).toBe(expected.isFailed);
  });

  it('getFinishedBlocksCount()', () => {
    // given
    block.setBlockRuns(runs[0], runs);

    // when
    const finishedBlocks = block.getFinishedBlocksCount();

    // then
    expect(finishedBlocks).toBe(expected.finishedCount);
  });

  it('getRunningBlocksCount()', () => {
    // given
    block.setBlockRuns(runs[0], runs);

    // when
    const running = block.getRunningBlocksCount();

    // then
    expect(running).toBe(expected.runningCount);
  });
}
