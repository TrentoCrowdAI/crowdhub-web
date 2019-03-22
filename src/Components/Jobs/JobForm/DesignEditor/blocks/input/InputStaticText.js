import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Editor} from '@tinymce/tinymce-react';
import BlockCard from "../BlockCard";

const BLOCK_TYPE = 'input_static_text';

class InputStaticText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      type: props.data.type,
      expanded: props.data.expanded || false
    };
  }

  handleEditorChange = text => this.props.onChange({text})

  onToggleExpansion = expanded => this.setState(
    {expanded},
    () => this.props.onChange(this.state)
  );


  render() {
    return (
      <BlockCard onToggleExpansion={this.onToggleExpansion} expanded={this.state.expanded} id={this.state.id}
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
