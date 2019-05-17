import React, {Component} from 'react';
import {Dropdown, Form} from "react-bootstrap";

import AbstractParameterModel from "../../AbstractParameterModel";
import "./BlockingContext.css";

const type = 'blockingContext';

class BlockingContextParameterModel extends AbstractParameterModel {
  isValid() {
    return true;
  }

  setBlockingContextId = (id) => this.setValue(id);

  getBlockingContextId = () => this.getValue();

  isBlockingContextSelected = () => !!this.getBlockingContextId();
}

class BlockingContextParameterWidget extends Component {

  getModel() {
    return this.props.model;
  }

  getBlockingContextsModel = () => this.getModel().blockModel.parent.getBlockingContexts();

  getBlockingContextName = (id) => this.getBlockingContextsModel()
    .getContexts()
    .find(context => context.id === id).name;


  onBlockingContextSelected = ({id}) => {
    this.getModel().setBlockingContextId(id);
    this.forceUpdate();
  };
  // TODO: Color the button with the color of the context block
  render() {
    const model = this.getModel();
    const definition = model.getDefinition();
    const blockingContextsModel = this.getBlockingContextsModel();

    return (
      <Form.Group>
        <Form.Label>
          {definition.displayName}
        </Form.Label>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>

        <Dropdown>
          <Dropdown.Toggle className="btn-block">
            {
              model.isBlockingContextSelected() ?
                this.getBlockingContextName(model.getBlockingContextId()) :
                'None'
            }
          </Dropdown.Toggle>

          <BlockingContextsDropdownMenu contexts={blockingContextsModel.getContexts()}
                                        onContextSelected={this.onBlockingContextSelected}/>
        </Dropdown>
      </Form.Group>
    );
  }
}

const BlockingContextsDropdownMenu = ({contexts, onContextSelected}) => (
  <Dropdown.Menu>
    {/* None blocking context */}
    <Dropdown.Item onClick={() => onContextSelected({id: null})} className="blocking-context-drop-down-item">
      <div className="blocking-context-color-box"/>
      None
    </Dropdown.Item>


    {
      contexts.map(context => (
        <Dropdown.Item key={context.id}
                       className="blocking-context-drop-down-item"
                       onClick={() => onContextSelected(context)}>
          <div className="blocking-context-color-box"
               style={{backgroundColor: context.color}}/>
          {context.name}
        </Dropdown.Item>
      ))
    }
  </Dropdown.Menu>
);

export default {
  type,
  Model: BlockingContextParameterModel,
  Widget: BlockingContextParameterWidget
}
