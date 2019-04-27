import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import {CodeFilePicker} from "./CodeFilePicker";

export class CodeEditorModalAndButton extends Component {
  state = {
    show: false
  };

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});

  onSave = (code) => {
    this.props.onUpdateCode(code);
    this.hideModal();
  };

  render() {
    return (
      <div>
        <Button className="btn-block" onClick={this.showModal}>Open editor</Button>
        <CodeEditorModal show={this.state.show}
                         onClose={this.hideModal}
                         onSave={this.onSave}
                         code={this.props.code}/>
      </div>
    );
  }
}

class CodeEditorModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code
    };
  }

  onCodeEdited = (code) => this.setState({code});

  onSave = () => this.props.onSave(this.state.code);

  render() {
    return (
      <Modal show={this.props.show} size="lg">
        <Modal.Header>Lambda block code editor</Modal.Header>

        <Modal.Body>
          <CodeFilePicker onFilePicked={this.onCodeEdited}/>

          <hr/>

          <CodeEditor code={this.state.code} onCodeEdited={this.onCodeEdited}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const CodeEditor = ({onCodeEdited, code}) => (
  <div>
    <h5>Editor</h5>
    <AceEditor
      style={{width: '100%'}}
      placeholder="Lambda block code"
      mode="javascript"
      theme="monokai"
      name="lambdaBlockCodeEditor"
      onChange={onCodeEdited}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}/>
  </div>
);
