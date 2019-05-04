import React, {Component} from 'react';

export default class RunsControls extends Component {
  render(){
    return <p>asp</p>;
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
