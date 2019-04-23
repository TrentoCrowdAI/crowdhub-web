import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import {DesignBlocksEditorModalAndButton} from "./DesignBlocksEditorModal";
import {DoDesignModel} from "./DesignModel";


class DoDesignWidget extends Component {

  getModel() {
    return this.props.model;
  }

  render() {
    const model = this.getModel();

    return (
      <Form.Group>
        <Form.Label>{model.getDisplayName()}</Form.Label>
        <Form.Text className="text-muted">
          {model.getDescription()}
        </Form.Text>

        {/*

        {
          model.isDesignEmpty() &&
          <PickDesignTemplateModalAndButton designModel={model}
                                    onModelUpdated={this.props.onModelUpdated}/>
        }
*/}

        <DesignBlocksEditorModalAndButton designModel={model}
                                          onModelUpdated={this.props.onModelUpdated}
                                          buttonText={model.isDesignEmpty() ? 'Create from scratch' : 'Open design editor'}/>
      </Form.Group>
    );
  }
}


export default {
  type: 'doDesign',
  Model: DoDesignModel,
  Widget: DoDesignWidget
}

