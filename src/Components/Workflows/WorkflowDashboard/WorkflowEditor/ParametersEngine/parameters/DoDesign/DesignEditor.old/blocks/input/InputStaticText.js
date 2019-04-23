import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Editor} from '@tinymce/tinymce-react';
import BlockCard from "../BlockCard";
import {blockState, toggleExpansionHandler} from "../utils";

const BLOCK_TYPE = 'input_static_text';

class InputStaticText extends Component {

  constructor(props) {
    super(props);
    this.state = blockState(props, {
      text: props.data.text || '',
      valid: true
    });
  }

  validate = () => true;

  handleEditorChange = text => this.props.onChange({...this.state, text});

  render() {
    return (
      <BlockCard {...this.state} onToggleExpansion={toggleExpansionHandler(this)} title="Input Static Text"
                 type={BLOCK_TYPE} expandable={this.props.expandable}>
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
