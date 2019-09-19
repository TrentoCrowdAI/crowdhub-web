import React, {Component} from "react";
import uuid from "uuid";
import {Button, Col, Form, Overlay, Popover} from "react-bootstrap";

import RandomColorPicker from "./RandomColorPicker";
import "./CreateBlockingContext.css";
import {
  DEFAULT_WORKER_BLOCKED_MESSAGE,
  isBlockingContextValid
} from "../../../WorkflowGraphEditor/models/BlockingContextsModel";

export default class CreateBlockingContext extends Component {

  togglePopoverButton = React.createRef();
  popoverContent = React.createRef();

  state = {
    show: false
  };

  showPopover = () => {
    this.setState({show: true});
    this.registerListenerToClosePopoverWhenUserClicksOutside();
  };

  registerListenerToClosePopoverWhenUserClicksOutside() {
    document.body.addEventListener('click', this.clickListenerToClosePopoverWhenUserClicksOutside);
  }

  clickListenerToClosePopoverWhenUserClicksOutside = (e) => {
    const popoverContent = this.popoverContent.current;
    const clickInPopover = e.composedPath().indexOf(popoverContent) >= 0;
    if (!clickInPopover) {
      this.hidePopover();
    }
  };

  onCreated = (context) => {
    this.hidePopover();
    this.props.onAdd(context);
  };

  hidePopover = () => {
    this.setState({show: false});
    this.unregisterListenerToClosePopoverWhenUserClicksOutside();
  };

  unregisterListenerToClosePopoverWhenUserClicksOutside() {
    document.body.removeEventListener('click', this.clickListenerToClosePopoverWhenUserClicksOutside);
  }

  render() {
    return (
      <div>
        <Button className="btn-block"
                onClick={this.showPopover}
                ref={this.togglePopoverButton}>Add experimental group</Button>
        <Overlay
          id="create-blocking-context-popover-container"
          show={this.state.show}
          placement="left"
          target={this.togglePopoverButton.current}
          container={document.getElementById('workflow-editor')}>

          <Popover title="Create experimental group"
                   id="create-blocking-context-popover"
                   placement="left">
            <div ref={this.popoverContent}>
              <CreateBlockingContextPopover onCreated={this.onCreated}/>
            </div>
          </Popover>
        </Overlay>
      </div>
    );
  }


}


class CreateBlockingContextPopover extends Component {

  state = {
    name: '',
    color: null,
    workerBlockedMessage: DEFAULT_WORKER_BLOCKED_MESSAGE
  };

  onNameChange = (e) => this.setState({name: e.target.value});

  onChangeColor = (color) => this.setState({color});

  getBlockingContextFromState = () => ({...this.state});

  onAdd = () => {
    this.props.onCreated({
      id: uuid(),
      ...this.getBlockingContextFromState()
    });
    this.setState({name: '', color: null});
  };


  render() {
    const {name, color} = this.state;
    return (
      <Form.Row>
        <Col xs="12">
          <Form.Group>
            <Form.Control name="name"
                          type="text"
                          placeholder="Experimental group name"
                          value={name}
                          onChange={this.onNameChange}/>
          </Form.Group>
        </Col>
        <Col xs="8">
          <RandomColorPicker color={color} onChange={this.onChangeColor}/>
        </Col>
        <Col xs="4">
          <Button className="btn-block"
                  disabled={!isBlockingContextValid(this.getBlockingContextFromState())}
                  onClick={this.onAdd}>Add</Button>
        </Col>
      </Form.Row>
    );
  }
}
