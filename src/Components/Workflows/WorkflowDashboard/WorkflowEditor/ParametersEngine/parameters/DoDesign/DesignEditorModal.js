import React, {Component} from 'react';

import {Button, Modal} from 'react-bootstrap';
import DesignEditor from "./DesignEditor/DesignEditor";
import {DoDesignModel} from "./DesignModel";


export class DesignEditorModalAndButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      clonedModel: this.cloneModel()
    }
  }

  cloneModel = () => new DoDesignModel(this.props.designModel); // TODO: Explain why we clone the model

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});

  onDesignUpdated = (designModel) => {
    this.props.onModelUpdated(designModel);
    this.hideModal();
  };

  render() {
    return (
      <div>
        <DesignEditorModal show={this.state.show}
                           onClose={this.hideModal}
                           designModel={this.state.clonedModel}
                           onModelUpdated={this.onDesignUpdated}/>

        <Button className="btn-block" onClick={this.showModal}>{this.props.buttonText}</Button>
      </div>
    );
  }

}

class DesignEditorModal extends Component {


  render() {
    const {designModel, onModelUpdated} = this.props;

    return (
      <Modal show={this.props.show} size="lg">
        <Modal.Header>Do block design editor</Modal.Header>

        <Modal.Body>
          <DesignEditor designModel={designModel}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={() => onModelUpdated(designModel)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

