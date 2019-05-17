import React, {Component} from "react";
import {Form} from "react-bootstrap";
import {ParameterContainerCard} from "../../ParametersEngine/ParametersEngine";

export class BlockLabel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: this.getLabel()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.blockModel !== this.getBlockModel()) {
      this.setState({
        label: this.getLabel()
      })
    }
  };

  getBlockModel = () => this.props.blockModel;

  getLabel = () => this.getBlockModel().getLabel();

  getGraphModel = () => this.props.graphModel;

  onChange = (event) => this.setState({
    label: event.target.value
  }, () => {
    if (this.isNewLabelValid()) {
      this.replaceLabel();
    }
  });

  isNewLabelValid = () => this.getGraphModel().isNewLabelValid(this.getBlockModel(), this.state.label);

  replaceLabel = () => {
    const block = this.getBlockModel();
    block.setLabel(this.state.label);
  };

  render() {
    return (
      <ParameterContainerCard title="Label">
        <Form.Group>
          <Form.Text className="text-muted">
            Label of the block
          </Form.Text>
          <Form.Control type="text"
                        value={this.state.label}
                        onChange={this.onChange}
                        isInvalid={!this.isNewLabelValid()}
                        disabled={this.props.disabled}/>
          <Form.Control.Feedback type="invalid">
            The label must be unique to all the blocks and must be at least one character long.
          </Form.Control.Feedback>
        </Form.Group>
      </ParameterContainerCard>
    );
  }
}
