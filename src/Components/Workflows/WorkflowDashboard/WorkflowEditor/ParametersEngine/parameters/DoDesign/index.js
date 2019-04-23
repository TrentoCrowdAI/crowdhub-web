import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import {DesignEditorModalAndButton} from "./DesignEditorModal";
import {DoDesignModel} from "./DesignModel";


// TODO: Transform in function
class DoDesignWidget extends Component {

  getModel() {
    console.log(this.props.model);
    return this.props.model;
  }

  onDesignChange = (design) => {
    console.log(design);
    this.getModel().setValue(design.getValue());
    this.props.onModelUpdated();
  };

  onTemplatePicked = this.onDesignChange;

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
          <PickDesignTemplateModalAndButton onTemplatePicked={this.onTemplatePicked}/>
        }
*/}

        <DesignEditorModalAndButton designModel={model}
                              onModelUpdated={this.onDesignChange}
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

