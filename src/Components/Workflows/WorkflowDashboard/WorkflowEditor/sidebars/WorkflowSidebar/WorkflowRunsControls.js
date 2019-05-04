import React, {Component} from 'react';

import ResultDownloader from "../RunsControls/ResultDownloader";
import RunsService from "../../../../../../Services/rest/RunsService";

export default class WorkflowRunsControls extends Component {
  render() {
    const {runnableWorkflow} = this.props;
    const workflow = runnableWorkflow.getWorkflow();
    return (
      <div>
        <ResultDownloader downloadLinkFactory={run => RunsService.getDownloadLink(run)}
                          downloadNameFactory={run => `${workflow.name} #${run.id}.csv`}
                          runnable={runnableWorkflow}/>
      </div>
    );
  }
}

/*

          {
            this.state.startWorkflowError &&
            <div className="start-workflow-error">
              <span>
                <i className="fas fa-exclamation-triangle"/> Can't start workflow!
              </span>
            </div>
          }

          <LoadingButton onClick={this.runWorkflow} block={true}
                         isSaving={this.state.startingWorkflow}>Run</LoadingButton>
 */

/*

  runWorkflow = async () => {
    try {
      // TODO: Save the workflow before starting
      this.setState({startingWorkflow: true, startWorkflowError: false});
      await WorkflowsService.startWorkflow(this.props.workflow);
    } catch (e) {
      this.setState({startWorkflowError: true});
    }
    this.setState({startingWorkflow: false});
  };
 */
