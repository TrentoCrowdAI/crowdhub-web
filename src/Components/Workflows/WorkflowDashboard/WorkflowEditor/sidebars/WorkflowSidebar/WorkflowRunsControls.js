import React, {Component} from 'react';

import RunsService from "../../../../../../Services/rest/RunsService";
import RunsControls from "../RunsControls/RunsControls";

export default class WorkflowRunsControls extends Component {
  render() {
    const {runnableWorkflow} = this.props;
    const workflow = runnableWorkflow.getWorkflow();
    return <RunsControls runnable={runnableWorkflow}
                         downloadLinkFactory={run => RunsService.getDownloadLink(run)}
                         downloadNameFactory={run => `${workflow.name} #${run.id}.csv`}
                         start={null}
                         isStarting={false}/>;
  }
}
