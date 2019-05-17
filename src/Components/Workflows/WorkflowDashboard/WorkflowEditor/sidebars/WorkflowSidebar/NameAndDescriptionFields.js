import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {ParameterContainerCard} from "../../ParametersEngine/ParametersEngine";

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

        <ParameterContainerCard title="Name">
          <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeName}
                        onBlur={this.onBlur} disabled={this.props.disabled}/>
        </ParameterContainerCard>

        <ParameterContainerCard title="Description">
          <Form.Control name="description" type="text" as="textarea" value={this.state.description}
                        onChange={this.onChangeDescription} onBlur={this.onBlur} disabled={this.props.disabled}/>
        </ParameterContainerCard>
      </div>
    );
  }
}
