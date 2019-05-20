import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

import AbstractParameterModel from "../../AbstractParameterModel";
import {Editor} from "@tinymce/tinymce-react";
import HtmlModalEditor from "./HtmlModalEditor";

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
    const EditorComponent = this.getEditor();

    return (
      <Form.Group>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>

        <EditorComponent onEditorChange={this.handleEditorChange}
                         initialValue={model.getValue()}
                         init={{menubar: false}}
                         disabled={this.props.disabled}
                         title={definition.displayName}/>
      </Form.Group>
    );
  }

  getEditor() {
    const model = this.getModel();
    const definition = model.getDefinition();
    if (definition.editorInModal) {
      return HtmlModalEditor;
    }
    return Editor;
  }

}

export default {
  type: 'html',
  Widget: HtmlWidget,
  Model: HtmlModel
}
