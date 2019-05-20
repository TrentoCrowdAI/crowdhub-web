import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Editor} from "@tinymce/tinymce-react";

export default class HtmlModalEditor extends Component {

  state = {
    show: false
  };

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});



  render() {
    return (
      <div>
        <Button className="btn-block" onClick={this.showModal}>Open editor</Button>

        <Modal show={this.state.show} size="lg">
          <Modal.Header>{this.props.title}</Modal.Header>

          <Modal.Body>
            <Editor {...this.props}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
