import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";

export class CodeFilePicker extends Component {

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

          <FormControl value={this.state.name} placeholder="Click the left button or drop a file" readOnly/>

          <InputGroup.Append>
            <Button style={{height: '24px', boxSizing: 'content-box'}}
                    disabled={this.state.content === null} onClick={this.onImport}>Import</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
