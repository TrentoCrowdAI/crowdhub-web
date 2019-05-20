import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

import BlockingContextsCRUD from "./BlockingContextsCRUD";
import {ParameterContainerCard} from "../../../ParametersEngine/ParametersEngine";

export default class WorkflowBlockingSettings extends Component {

  render() {
    const {graphModel, onModelUpdate} = this.props;
    return (
      <ParameterContainerCard title="Blocking workers">
        <WorkflowBlockingCheckbox graphModel={graphModel} onModelUpdate={onModelUpdate}/>
        <BlockingContextsCRUD graphModel={graphModel} onModelUpdate={onModelUpdate}/>
      </ParameterContainerCard>
    );
  }

}


class WorkflowBlockingCheckbox extends Component {

  checkboxRef = React.createRef();

  componentDidMount() {
    this.renderCheckboxIndeterminateState();
  }

  onChange = () => {
    const blockingContextsModel = this.getBlockingContextsModel();
    if (this.isIndeterminate() || !blockingContextsModel.areSomeBlockingContextsEnabled()) {
      blockingContextsModel.mutateToSingleBlockingContextForAllDoBlocks()
    } else {
      blockingContextsModel.removeAllBlockingContexts();
    }
  };

  getBlockingContextsModel = () => this.props.graphModel.getBlockingContexts();

  render() {
    const blockingContextsModel = this.getBlockingContextsModel();
    this.renderCheckboxIndeterminateState();
    return (
      <div>
        <Form.Group>
          <Form.Text className="text-muted">
            If checked, one worker will be able to work only on one job of this workflow. When indeterminate, workers
            won't be able to work on job of the same blocking context
          </Form.Text>
          <Form.Check ref={this.checkboxRef}
                      type="checkbox"
                      label="Block workers"
                      value={blockingContextsModel.areSomeBlockingContextsEnabled()}
                      onChange={this.onChange}/>
        </Form.Group>
      </div>
    );
  }

  renderCheckboxIndeterminateState() {
    const checkbox = this.checkboxRef.current;
    if (checkbox) {
      checkbox.indeterminate = this.isIndeterminate();
    }
  }

  isIndeterminate() {
    const blockingContextsModel = this.getBlockingContextsModel();
    return blockingContextsModel.areSomeBlockingContextsEnabled() &&
      !blockingContextsModel.isSignleBlockingContextEnabledForAllDoBlocks();
  }
}