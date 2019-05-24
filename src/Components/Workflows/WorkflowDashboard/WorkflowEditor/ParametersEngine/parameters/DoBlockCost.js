import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import AbstractParameterModel from "../AbstractParameterModel";
import LoadingButton from "../../../../../common/LoadingButton";
import WorkflowsService from "../../../../../../Services/rest/WorkflowsService";

class DoBlockCostWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      estimatedCost: this.getModel().getEstimatedCost(),
      estimationError: false,
      estimating: false
    };
  }

  getModel() {
    return this.props.model;
  }

  estimateCost = async () => {
    this.setState({estimatedCost: null, estimationError: false, estimating: true});
    try {
      const estimatedCost = await WorkflowsService.estimateDoBlockCost(
        this.getWorkflowId(), this.getBlockId()
      );
      this.onCostEstimated(estimatedCost);
    } catch (e) {
      this.setState({estimatedCost: null, estimationError: true, estimating: false});
    }
  };

  getWorkflowId() { // TODO: Clear
    const blockModel = this.getBlockModel();
    const workflowModel = blockModel.parent;
    return workflowModel.workflowId;
  }

  getBlockModel() {
    return this.getModel().blockModel;
  }

  getBlockId() {
    const blockModel = this.getBlockModel();
    return blockModel.id;
  }

  onCostEstimated(estimatedCost) {
    this.setState({estimatedCost, estimationError: false, estimating: false});
    this.getModel().setEstimatedCost(estimatedCost);
  }

  render() {
    return (
      <div>
        {this.renderEstimatedCost()}

        <LoadingButton block onClick={this.estimateCost}
                       isLoading={this.state.estimating}
                       disabled={this.props.disabled}>
          Estimate cost
        </LoadingButton>
      </div>
    );
  }

  renderEstimatedCost() {
    if (this.state.estimatedCost === null) {
      return this.renderCostNeverEstimated();
    }
    return this.renderLatestEstimatedCost();
  }

  renderCostNeverEstimated() {
    return (
      <Form.Text className="text-muted">
        The cost of this block has never been estimated. Click the button below to estimate it.
      </Form.Text>
    );
  }

  renderLatestEstimatedCost() {
    return (
      <div>
        <Form.Text className="text-muted">
          The latest estimated cost is: <strong>{this.state.estimatedCost}$</strong>.
          Click the button below to estimate it again.
        </Form.Text>
      </div>
    );
  }
}

class DoBlockCostModel extends AbstractParameterModel {

  isValid() {
    return true;
  }

  setEstimatedCost(estimatedCost) {
    if (estimatedCost) {
      estimatedCost = estimatedCost.toFixed(2);
    }
    this.setValue(estimatedCost);
  }

  getEstimatedCost() {
    return this.getValue();
  }
}

export default {
  type: 'doBlockCost',
  Widget: DoBlockCostWidget,
  Model: DoBlockCostModel
}
