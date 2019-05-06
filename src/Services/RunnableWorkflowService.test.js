import WorkflowsService from "./rest/WorkflowsService";
import RunsService from "./rest/RunsService";
import Runs from "../models/Runs";
import RunnableWorkflowService from "./RunnableWorkflowService";
import RunnableWorkflow from "../models/RunnableWorkflow";

test('should retrieve the workflow and the runs', async () => {
  // given
  const mockedGetWorkflow = WorkflowsService.getWorkflow = jest.fn(() => ({id: 1}));
  const mockedGetRuns = RunsService.getRunsOfWorkflow = jest.fn(() => new Runs([]));

  // when
  const runnable = await RunnableWorkflowService.getRunnableWorkflow(1);

  // then
  expect(mockedGetWorkflow).toHaveBeenCalled();
  expect(mockedGetRuns).toHaveBeenCalled();

  expect(runnable.getWorkflow().id).toBe(1);
  expect(runnable.getRuns().runs).toEqual([]);
});


test('should throw an error if getWorkflow fails', async () => {
  // given
  WorkflowsService.getWorkflow = jest.fn(() => {
    throw new Error()
  });
  RunsService.getRunsOfWorkflow = jest.fn(() => new Runs([]));

  // when
  let error;
  try {
    await RunnableWorkflowService.getRunnableWorkflow(1);
  } catch (e) {
    error = e;
  }

  // then
  expect(error).toBeDefined();
});

test('should throw an error if getRunsOfWorkflow fails', async () => {
  // given
  WorkflowsService.getWorkflow = jest.fn(() => ({id: 1}));
  RunsService.getRunsOfWorkflow = jest.fn(() => {
    throw new Error()
  });

  // when
  let error;
  try {
    await RunnableWorkflowService.getRunnableWorkflow(1);
  } catch (e) {
    error = e;
  }

  // then
  expect(error).toBeDefined();
});

describe('test runs polling', () => {
  it('sends a request every x seconds', (done) => {
    // given
    const mockedGetRuns = RunsService.getRunsOfWorkflow = jest.fn(() => new Runs([]));
    const runnable = new RunnableWorkflow({id: 1});

    // when
    RunnableWorkflowService.startWatchingRunsStatus(runnable, 100);

    // then
    const listener = () => {
      expect(mockedGetRuns).toHaveBeenCalled();

      // clear
      RunnableWorkflowService.stopWatchRunsStatus(listener);
      done();
    };
    runnable.addRunsListener(listener);
  });
});
