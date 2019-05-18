import React, {Component} from 'react';
import {Dropdown, Form} from "react-bootstrap";

import AbstractParameterModel from "../../AbstractParameterModel";
import "./BlockingContext.css";
import {getTextColorVisibleOnBackground} from "../../../../../../utils/colors";

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

  getBlockingContextsModel = () => this.getModel().blockModel.getBlockingContexts();

  getBlockingContextName = (id) => this.getBlockingContextsModel()
    .getBlockingContextById(id).name;


  onBlockingContextSelected = ({id}) => {
    this.getModel().setBlockingContextId(id);
    this.props.onModelUpdated();
  };

  render() {
    const model = this.getModel();
    const definition = model.getDefinition();
    const blockingContextsModel = this.getBlockingContextsModel();

    return (
      <div>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>

        <Dropdown>
          {
            this.renderToggle()
          }

          <BlockingContextsDropdownMenu contexts={blockingContextsModel.getContexts()}
                                        onContextSelected={this.onBlockingContextSelected}/>
        </Dropdown>
      </div>
    );
  }

  renderToggle() {
    const model = this.getModel();
    if (!model.isBlockingContextSelected()) {
      return <Dropdown.Toggle className="btn-block">None</Dropdown.Toggle>;
    }


    const context = this.getBlockingContextsModel().getBlockingContextById(model.getBlockingContextId());
    return (
      <Dropdown.Toggle className="btn-block"
                       style={{
                         backgroundColor: context.color,
                         border: context.color,
                         color: getTextColorVisibleOnBackground(context.color)
                       }}>
        {context.name}
      </Dropdown.Toggle>
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
