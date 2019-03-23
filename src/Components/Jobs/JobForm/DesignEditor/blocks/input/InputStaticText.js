import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Editor} from '@tinymce/tinymce-react';
import BlockCard from "../BlockCard";
import {toggleExpansionHandler} from "../utils";

const BLOCK_TYPE = 'input_static_text';

class InputStaticText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      type: props.data.type,
      expanded: props.data.expanded || false,

      text: props.data.text || 'some static text'
    };
  }

  handleEditorChange = text => this.props.onChange({text});

  render() {
    return (
      <BlockCard onToggleExpansion={toggleExpansionHandler(this)} expanded={this.state.expanded} id={this.state.id}
                 title="Input Static Text" type={BLOCK_TYPE} expandable={this.props.expandable}>
        <Form.Group>
          <Editor onEditorChange={this.handleEditorChange}
                  initialValue={this.props.data.text}
                  init={{menubar: false}}/>
        </Form.Group>
      </BlockCard>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: InputStaticText
}
