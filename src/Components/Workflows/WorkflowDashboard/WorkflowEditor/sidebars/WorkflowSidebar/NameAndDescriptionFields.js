import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";

export default class NameAndDescriptionFields extends Component {


  constructor(props) {
    super(props);
    const {name, description} = props.workflow;
    this.state = {
      name,
      description
    }
  }

  onChangeName = (event) => this.setState({
    name: event.target.value
  });

  onChangeDescription = (event) => this.setState({
    description: event.target.value
  });

  onBlur = () => this.props.onEdit({
    ...this.props.workflow,
    name: this.state.name || this.props.name,
    description: this.state.description || this.props.description
  });


  render() {
    return (
      <div>
        {/* Name */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeName}
                            onBlur={this.onBlur}/>
            </Form.Group>
          </Col>
        </Row>

        {/* Description */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" as="textarea" value={this.state.description}
                            onChange={this.onChangeDescription} onBlur={this.onBlur}/>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}
