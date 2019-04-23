import React, {Component} from 'react';

import {Button, Modal} from 'react-bootstrap';
import DesignEditor from "./DesignEditor/DesignEditor";
import {DesignBlocksModel} from "./DesignModel";


export class DesignBlocksEditorModalAndButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      designBlocksClonedModel: this.cloneModel()
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // Hacky
    this.state.designBlocksClonedModel = this.cloneModel();
  }

  getModel() {
    return this.props.designModel;
  }

  cloneModel () {
    return new DesignBlocksModel(this.getModel().getBlocksModel());
  }

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});

  onSave = () => {
    this.getModel().setBlocksModel(this.state.designBlocksClonedModel);
    this.props.onModelUpdated();
    this.hideModal();
  };

  render() {
    return (
      <div>
        <DesignBlocksEditorModal show={this.state.show}
                                 designBlocksModel={this.state.designBlocksClonedModel}
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
          <DesignEditor designBlocksModel={designBlocksModel} onModelUpdated={()=>this.forceUpdate()}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave} disabled={!designBlocksModel.isValid()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

