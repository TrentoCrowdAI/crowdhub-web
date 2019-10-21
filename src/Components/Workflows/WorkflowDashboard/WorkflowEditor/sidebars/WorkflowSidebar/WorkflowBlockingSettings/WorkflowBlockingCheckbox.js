import React, {Component} from "react";
import {Form} from "react-bootstrap";

export default class WorkflowBlockingCheckbox extends Component {

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
    this.props.onModelUpdate();
  };

  getBlockingContextsModel = () => this.props.graphModel.getBlockingContexts();

  render() {
    const blockingContextsModel = this.getBlockingContextsModel();
    this.renderCheckboxIndeterminateState();
    return (
      <div>
        <Form.Group>
          <Form.Text className="text-muted">
          If checked, workers will be able to work only on one experimental group of this workflow.
          </Form.Text>
          <Form.Check ref={this.checkboxRef}
                      type="checkbox"
                      label="Should workers participate in more than one experimental group?"
                      checked={blockingContextsModel.areSomeBlockingContextsEnabled()}
                      onChange={this.onChange}
                      disabled={this.props.disabled}/>
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
      !blockingContextsModel.isSingleBlockingContextEnabledForAllDoBlocks();
  }
}
