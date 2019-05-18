import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import {DesignBlocksEditorModalAndButton} from "./DesignBlocksEditorModal";
import {DoDesignModel} from "./DoDesignModel";
import {PickDesignTemplateModalAndButton} from "./PickDesignTemplateModal";


class DoDesignWidget extends Component {

  state = {
    templateJustPicked: false
  };

  getModel() {
    return this.props.model;
  }

  onModelUpdatedFromTemplate = () => {
    this.props.onModelUpdated();
    this.setState({templateJustPicked: true});
  };

  onModelUpdatedFromEditor = () => {
    this.props.onModelUpdated();
    this.setState({templateJustPicked: false});
  };

  render() {
    const model = this.getModel();
    const definition = model.getDefinition();

    return (
      <div>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>

        {
          model.isDesignEmpty() &&
          <PickDesignTemplateModalAndButton designModel={model}
                                            onModelUpdated={this.onModelUpdatedFromTemplate}
                                            disabled={this.props.disabled}/>
        }

        <DesignBlocksEditorModalAndButton designModel={model}
                                          onModelUpdated={this.onModelUpdatedFromEditor}
                                          buttonText={model.isDesignEmpty() ? 'Create from scratch' : 'Open design editor'}
                                          templateJustPicked={this.state.templateJustPicked}
                                          disabled={this.props.disabled}/>
      </div>
    );
  }
}


export default {
  type: 'doDesign',
  Model: DoDesignModel,
  Widget: DoDesignWidget
}

