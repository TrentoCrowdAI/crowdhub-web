import React, {Component} from 'react';

import {Button, Modal} from 'react-bootstrap';
import DesignEditor from "./DesignEditor/DesignEditor";


export class DesignBlocksEditorModalAndButton extends Component {

  state = {
    show: false
  };

  constructor(props) {
    super(props);
    this.designBlocksClonedModel = this.cloneDesignBlocksModel();
  }

/*

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.designBlocksClonedModel = this.cloneDesignBlocksModel();
  }
*/

  getModel() {
    return this.props.designModel;
  }

  cloneDesignBlocksModel() {
    return this.getModel().getBlocksModel().clone();
  }

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});

  onSave = () => {
    this.getModel().setBlocksModel(this.designBlocksClonedModel);
    this.props.onModelUpdated();
    this.hideModal();
  };

  render() {
    return (
      <div>
        <DesignBlocksEditorModal show={this.state.show}
                                 designBlocksModel={this.designBlocksClonedModel}
                                 onClose={this.hideModal}
                                 onSave={this.onSave}/>

        <Button className="btn-block" onClick={this.showModal}>{this.props.buttonText}</Button>
      </div>
    );
  }

}

class DesignBlocksEditorModal extends Component {


  render() {
    const {designBlocksModel, onSave, onClose} = this.props;

    return (
      <Modal show={this.props.show} size="lg">
        <Modal.Header>Do block design editor</Modal.Header>

        <Modal.Body>
          <DesignEditor designBlocksModel={designBlocksModel} onModelUpdated={() => this.forceUpdate()}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave} disabled={!designBlocksModel.isValid()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

