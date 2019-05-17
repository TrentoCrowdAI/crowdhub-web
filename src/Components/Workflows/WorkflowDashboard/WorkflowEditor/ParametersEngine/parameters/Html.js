import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

import AbstractParameterModel from "../AbstractParameterModel";
import {Editor} from "@tinymce/tinymce-react";

class HtmlModel extends AbstractParameterModel {
  isValid() {
    return true;
  }
}

class HtmlWidget extends Component {


  handleEditorChange = (text) => {
    this.getModel().setValue(text);
    this.props.onModelUpdated();
  };

  getModel() {
    return this.props.model;
  }

  render() {
    const model = this.getModel();
    const definition = model.getDefinition();

    return (
      <Form.Group>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>


        <Editor onEditorChange={this.handleEditorChange}
                initialValue={model.getValue()}
                init={{menubar: false}}
                disabled={this.props.disabled}/>
      </Form.Group>
    );
  }
}

export default {
  type: 'html',
  Widget: HtmlWidget,
  Model: HtmlModel
}
