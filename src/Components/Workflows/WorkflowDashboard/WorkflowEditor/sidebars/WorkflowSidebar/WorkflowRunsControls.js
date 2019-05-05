import React, {Component} from 'react';

import RunsService from "../../../../../../Services/rest/RunsService";
import RunsControls from "../RunsControls/RunsControls";
import WorkflowsService from "../../../../../../Services/rest/WorkflowsService";

export default class WorkflowRunsControls extends Component {

  state = {
    isStarting: false,
    startError: false
  };

  startWorkflow = async () => {
    this.setState({isStarting: true, startError: false});
    try {
      const startedRunId = await WorkflowsService.startWorkflow(this.getWorkflow());
      await this.waitForRunStateReceived(startedRunId);
    } catch (e) {
      this.setState({startError: true});
    }
    this.setState({isStarting: false});
  };

  waitForRunStateReceived = (startedRunId) => new Promise((resolve, reject) => {
    const listener = (runnableWorkflow) => {
      if (runnableWorkflow.getRuns().containsRun(startedRunId)) {
        runnableWorkflow.removeRunsListener(listener);
        resolve();
      }
    };
    this.props.runnableWorkflow.addRunsListener(listener);
  });

  getWorkflow = () => this.props.runnableWorkflow.getWorkflow();

  render() {
    const {isStarting} = this.state;
    const {runnableWorkflow} = this.props;
    const workflow = runnableWorkflow.getWorkflow();
    return <RunsControls runnable={runnableWorkflow}
                         downloadLinkFactory={run => RunsService.getDownloadLink(run)}
                         downloadNameFactory={run => `${workflow.name} #${run.id}.csv`}
                         startText="Start workflow"
                         onStart={this.startWorkflow}
                         isStarting={isStarting}/>;
  }
}
