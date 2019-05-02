import React, {Component} from "react";
import {Form} from "react-bootstrap";

export class IdField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.getBlockId()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.blockModel !== this.getBlockModel()) {
      this.setState({
        id: this.getBlockId()
      })
    }
  };

  getBlockModel = () => this.props.blockModel;

  getBlockId = () => this.getBlockModel().getId();

  getGraphModel = () => this.props.graphModel;

  onChange = (event) => this.setState({
    id: event.target.value
  }, () => {
    if (this.isNewIdValid()) {
      this.replaceNodeId();
    }
  });

  isNewIdValid = () => {
    return this.state.id === this.getBlockModel().getId() || this.getGraphModel().isNewIdValid(this.state.id);
  };

  replaceNodeId = () => {
    const block = this.getBlockModel();
    const oldId = block.getId();
    const newId = this.state.id;
    this.getGraphModel().replaceBlockId(block, newId);
    this.updateDOMElementsOfBlockWithNewId(oldId, newId);
  };

  updateDOMElementsOfBlockWithNewId = (oldId, newId) =>
    document.querySelectorAll(`div[data-nodeid="${oldId}"]`)
      .forEach(element => element.setAttribute('data-nodeid', newId));

  render() {
    return (
      <Form.Group>
        <Form.Label>Id</Form.Label>
        <Form.Text className="text-muted">
          Id of the block
        </Form.Text>
        <Form.Control type="text"
                      value={this.state.id}
                      onChange={this.onChange}
                      isInvalid={!this.isNewIdValid()}
        />
        <Form.Control.Feedback type="invalid">
          The id must be unique to all the blocks and must be at least one character long.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}
