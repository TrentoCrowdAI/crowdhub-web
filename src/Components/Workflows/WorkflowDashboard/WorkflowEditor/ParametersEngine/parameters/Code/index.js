import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

import AbstractParameterModel from "../../AbstractParameterModel";
import {CodeEditorModalAndButton} from "./CodeEditorModal";

class CodeModel extends AbstractParameterModel {
  isValid() {
    return true;
  }

  getCode() {
    return this.getValue();
  }

  setCode(code) {
    this.setValue(code);
  }
}

class CodeWidget extends Component {


  onUpdateCode = (code) => {
    this.getModel().setCode(code);
    this.props.onModelUpdated();
  };

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

        <CodeEditorModalAndButton code={model.getCode()} onUpdateCode={this.onUpdateCode}/>
      </Form.Group>
    );
  }
}

export default {
  type: 'code',
  Widget: CodeWidget,
  Model: CodeModel
}
