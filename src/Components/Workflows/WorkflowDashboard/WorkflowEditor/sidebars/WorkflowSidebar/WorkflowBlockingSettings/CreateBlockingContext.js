import React, {Component} from "react";
import uuid from "uuid";
import {Button, Col, Form, Overlay, Popover} from "react-bootstrap";

import RandomColorPicker from "./RandomColorPicker";

export default class CreateBlockingContext extends Component {

  state = {
    show: false
  };

  container = React.createRef();

  // TODO: Fix position of popver

  onShowPopover = ({target}) => this.setState({show: true, target});

  onCreated = (context) => {
    this.setState({show: false});
    this.props.onAdd(context);
  };

  render() {
    return (
      <div >
        <Button className="btn-block" onClick={this.onShowPopover} ref={this.container}>Add blocking context</Button>
        {
          this.container.current &&
          <Overlay
            show={this.state.show}
            placement="left-start"
            constainer={this.container.current}
            target={this.container.current}>

            <CreateBlockingContextPopover onCreated={this.onCreated}/>
          </Overlay>
        }
      </div>
    );
  }


}


class CreateBlockingContextPopover extends Component {


  state = {
    name: '',
    color: null
  };

  onNameChange = (e) => this.setState({name: e.target.value});

  onChangeColor = (color) => this.setState({color});

  isValid = () => this.state.name.length > 0;

  onAdd = () => {
    this.props.onCreated({
      id: uuid(),
      name: this.state.name,
      color: this.state.color
    });
    this.setState({name: '', color: null});
  };


  render() {
    const {name, color} = this.state;
    return (
      <Popover title="Create blocking context" id="a">
        <Form.Row>
          <Col xs="12">
            <Form.Group>
              <Form.Control name="name"
                            type="text"
                            placeholder="Blocking context name"
                            value={name}
                            onChange={this.onNameChange}/>
            </Form.Group>

          </Col>
          <Col xs="8">
            <RandomColorPicker color={color} onChange={this.onChangeColor}/>
          </Col>
          <Col xs="4">
            <Button className="btn-block"
                    disabled={!this.isValid()}
                    onClick={this.onAdd}>Add</Button>
          </Col>
        </Form.Row>
      </Popover>
    );
  }
}
