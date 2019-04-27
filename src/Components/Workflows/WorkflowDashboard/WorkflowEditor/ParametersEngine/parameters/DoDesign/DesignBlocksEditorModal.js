import React, {Component} from 'react';

import {Button, Modal} from 'react-bootstrap';
import DesignEditor from "./DesignEditor/DesignEditor";


export class DesignBlocksEditorModalAndButton extends Component {

  /**
   * To not propagate every update on the DesignBlocks to the workflow Blocks, we clone the BlocksModel.
   */
  designBlocksClonedModel;

  state = {
    show: false
  };

  constructor(props) {
    super(props);
    this.designBlocksClonedModel = this.cloneDesignBlocksModel();
  }

  /**
   * If the user picks a template, we need to update get a new clone of the BlocksModel
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.templateJustPicked) {
      this.designBlocksClonedModel = this.cloneDesignBlocksModel();
      this.props.onModelUpdated();
    }
  }

  getModel() {
    return this.props.designModel;
  }

  cloneDesignBlocksModel() {
    return this.getModel().getBlocksModel().clone();
  }

  showModal = () => this.setState({show: true});

  hideModal = () => this.setState({show: false});

  /**
   * When the user clicks on the 'save' button, we need to get the DoDesignModel and set the clones BlocksModel
   */
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
          <DesignEditor designBlocksModel={designBlocksModel}
                        onModelUpdated={() => {
                          // Since we don't have a state to update but we change the models, we need to tell react to
                          // render again the components
                          this.forceUpdate()
                        }}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave} disabled={!designBlocksModel.isValid()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

