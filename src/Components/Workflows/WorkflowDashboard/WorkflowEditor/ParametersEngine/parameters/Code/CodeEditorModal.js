import React, {Component} from 'react';
import {Button, Modal, InputGroup, FormControl} from "react-bootstrap";
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/theme/monokai';

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

class CodeFilePicker extends Component {

  state = {
    name: '',
    content: null
  };

  onChange = (event) => {
    const target = event.target;
    const files = target.files;
    if (files.length === 1) {
      this.onPickFile(files[0]);
    }
  };

  onPickFile = async (file) => {
    this.setState({
      name: file.name,
      content: await this.readFileContent(file)
    });
  };

  readFileContent = async (file) => {
    // TODO: Handle error
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.addEventListener('load', (event) => resolve(event.target.result));
      reader.readAsText(file);
    });
  };

  onImport = () => this.props.onFilePicked(this.state.content);

  render() {
    return (
      <div>
        <h5>Import from file</h5>
        <InputGroup>
          <InputGroup.Prepend>
            <label className="btn btn-primary">
              Select file
              <input type="file" style={{display: 'none'}} accept=".js" multiple={false} onChange={this.onChange}/>
            </label>
          </InputGroup.Prepend>

          <FormControl value={this.state.name} placeholder="Click the left button or drop a file" readonly/>

          <InputGroup.Append>
            <Button style={{height: '24px', boxSizing: 'content-box'}}
                    disabled={this.state.content === null} onClick={this.onImport}>Import</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
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
