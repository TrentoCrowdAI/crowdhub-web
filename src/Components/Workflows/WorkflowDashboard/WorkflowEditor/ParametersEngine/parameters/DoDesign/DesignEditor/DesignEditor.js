import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import Dragula from "dragula";
import "dragula/dist/dragula.css";

import DraggableDesignBlockTypeList from "./DraggableDesignBlockTypeList";
import EditableDesignBlockList from "./EditableDesignBlockList";
import {DesignBlockModel} from "../DesignModel";


// TODO: Move in EditableDesignBlockList
const findSiblingIndex = (sibling, siblingsContainer) => {
  for (let i = 0; i < siblingsContainer.children.length; i++) {
    if (siblingsContainer.children[i] === sibling) {
      return i;
    }
  }

  return -1;
};


export default class DesignEditor extends Component {

  blockTypesRef = null;
  blocksRef = null;
  drake = null;

  constructor(props) {
    super(props);

    this.blockTypesRef = React.createRef();
    this.blocksRef = React.createRef();
  }

  componentDidMount = () => this.setupDragula();

  setupDragula = () => {
    const blockTypes = this.blockTypesRef.current;
    const blocks = this.blocksRef.current;
    const containers = [blockTypes, blocks];

    this.drake = Dragula(containers, {
      copy: (el, source) => source === blockTypes,

      // Blocks can be dragged only into the design column
      accepts: (el, target) => target === blocks,

      // Removes blocks when they are spilled (this applies only to blocks not copiable)
      removeOnSpill: true
    });

    // TODO: Move in EditableDesignBlockList
    this.drake.on('drop', (element, target, source, sibling) => {
      if (target === blocks) {
        const siblingIndex = findSiblingIndex(sibling, blocks);
        const isAddingBlock = source === blockTypes;

        if (isAddingBlock) {
          this.onBlockAdded(element, siblingIndex);
        } else {
          this.onBlockSorted(element, siblingIndex);
        }
      }
    });
  };

  onBlockAdded = (element, nextSiblingIndex) => {
    this.assertNextSiblingIndexIsValidGivenInitialBlocks(nextSiblingIndex);

    const newBlockIndex = this.getNewBlockIndexGivenNextSiblingIndex(nextSiblingIndex);
    const newBlock = this.buildNewBlockDataGivenClonedElement(element);

    this.addBlockDataToTheDesignAndNotify(newBlock, newBlockIndex);

    // Dragula cloned the element from the tools container, but react don't know this. React will render a new
    // div (for the new block added to the design), so we need to remove the block that Dragula created (the cloned div)
    element.parentNode.removeChild(element);
  };

  assertNextSiblingIndexIsValidGivenInitialBlocks = (nextSiblingIndex) => {
    if (nextSiblingIndex === 0 || nextSiblingIndex > this.getModel().getBlocks().length) {
      throw new Error('invalid nextSiblingIndex given the current blocks array');
    }
  };

  getNewBlockIndexGivenNextSiblingIndex = (nextSibling) => nextSibling === -1 ? this.getModel().getBlocks().length : nextSibling - 1;

  buildNewBlockDataGivenClonedElement = (element) => {
    const blockType = JSON.parse(element.getAttribute('data-block-type'));
    return new DesignBlockModel(blockType);
  };

  addBlockDataToTheDesignAndNotify = (newBlock, newBlockIndex) => {
    this.getModel().addBlock(newBlock, newBlockIndex);
    this.forceUpdate(); //T TODO: PRova a rimuovere aggiornando lo stato
  };

  onBlockSorted = (element, nextSiblingIndex) => {
    this.assertNextSiblingIndexIsValidGivenInitialBlocks(nextSiblingIndex);

    const blockAIndex = this.getMovedBlockIndex(element);
    const blockBIndex = this.getBlockIndexGivenNextSiblingIndex(nextSiblingIndex);

    this.getModel().swapBlocks(blockAIndex, blockBIndex);
    this.forceUpdate(); //T TODO: PRova a rimuovere aggiornando lo stato
  };


  getMovedBlockIndex = (element) => {
    const blocks = this.getModel().getBlocks();
    const id = element.getAttribute('data-block-id');

    return blocks.findIndex(block => block.id === id);
  };

  getBlockIndexGivenNextSiblingIndex = (nextSibling) => nextSibling === -1 ? this.getModel().getBlocks().length - 1 : nextSibling - 1;

  getModel() {
    return this.props.designBlocksModel;
  }


  render() {
    return (
      <Row>
        <Col md="6" lg="4">
          <DraggableDesignBlockTypeList componentsContainerRef={this.blockTypesRef}/>
        </Col>

        <Col md="6" lg="8">
          <EditableDesignBlockList componentsContainerRef={this.blocksRef}
                                   designModel={this.getModel()}
                                   onParameterModelUpdate={this.props.onModelUpdated}/>
        </Col>
      </Row>
    )
  }
}
