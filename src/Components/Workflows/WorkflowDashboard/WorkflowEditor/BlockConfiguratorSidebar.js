import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";

import ParametersEngine from "./ParametersEngine/ParametersEngine";
import "./BlockConfiguratorSidebar.css";

export default ({block, graphModel, onModelUpdate}) => (
  <div className="parameters-engine-container"
       onKeyUp={e => {
         // prevent block cancellation when backspace is pressed
         e.stopPropagation()
       }}>
    <Row>
      <Col>
        <h5>Block parameters</h5>
      </Col>
    </Row>


    <IdField
      blockModel={block}
      graphModel={graphModel}/>

    <ParametersEngine
      parametrizedBlock={block}
      onParameterModelUpdate={onModelUpdate}/>
  </div>
);

export class IdField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.getBlockModel().getId()
    }
  }


  componentDidUpdate = (prevProps) => {
    if(prevProps.blockModel !== this.getBlockModel()) {
      this.setState({id: this.getBlockModel().getId()})
    }
  };

  getBlockModel = () => this.props.blockModel;

  getGraphModel = () => this.props.graphModel;

  onChange = (event) => this.setState({id: event.target.value});

  onBlur = () => {
    if (this.isNewIdValid()) {
      const block = this.getBlockModel();
      const oldId = block.getId();
      const newId = this.state.id;
      this.getGraphModel().replaceBlockId(block, newId);
      document.querySelectorAll(`div[data-nodeid="${oldId}"]`)
        .forEach(element => element.setAttribute('data-nodeid', newId));
    }
  };

  isNewIdValid = () => {
    return this.state.id === this.getBlockModel().getId() || this.getGraphModel().isNewIdValid(this.state.id);
  };

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
                      onBlur={this.onBlur}
                      isInvalid={!this.isNewIdValid()}
        />
        <Form.Control.Feedback type="invalid">
          The id must be unique to all the blocks and must be at least one character long
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}
