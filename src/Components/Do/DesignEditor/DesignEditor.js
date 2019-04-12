import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import uuid from 'uuid';

import Dragula from 'dragula';
import "dragula/dist/dragula.css";

import BlocksColumn from "./BlocksColumn";
import blockDefinitionsMap from './blocks/definitions';

// Array of all the possible blocks, without any data. This array is used to show the tools column from which the user
// drags out the tools
const tools = Object.keys(blockDefinitionsMap).map(type => {
  return {type}
});

const findSiblingIndex = (sibling, siblingsContainer) => {
  for (let i = 0; i < siblingsContainer.children.length; i++) {
    if (siblingsContainer.children[i] === sibling) {
      return i;
    }
  }

  return -1;
};

export default class DesignEditor extends Component {

  constructor(props) {
    super(props);

    this.toolsBlocksRef = React.createRef();
    this.designBlocksRef = React.createRef();
  }

  componentDidMount = () => this.setupDragula();

  setupDragula = () => {
    const toolsBlocks = this.toolsBlocksRef.current;
    const designBlocks = this.designBlocksRef.current;
    const containers = [
      this.toolsBlocksRef.current,
      this.designBlocksRef.current
    ];

    this.drake = Dragula(containers, {
      copy: (el, source) => source === toolsBlocks,

      // Blocks can be dragged only into the design column
      accepts: (el, target) => target === designBlocks,

      // Removes blocks when they are spilled (this applies only to blocks not copiable)
      removeOnSpill: true
    });

    this.drake.on('drop', (element, target, source, sibling) => {
      if (target === designBlocks) {
        const siblingIndex = findSiblingIndex(sibling, designBlocks);
        const isAddingToolToDesign = source === toolsBlocks;

        if (isAddingToolToDesign) {
          this.onBlockAdded(element, siblingIndex);
        } else {
          this.onBlockSorted(element, siblingIndex);
        }
      }
    });

    this.drake.on('remove', (element, container) => {
      // Dragula removed the element from the design blocks container, but react don't know this.
      // We need to re-append the element to the container: react will re-remove it when the state gets updated
      container.appendChild(element);

      const id = element.getAttribute('data-block-id');
      this.removeBlockDataByIdAndNotify(id);
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

  onBlockSorted = (element, nextSiblingIndex) => {
    this.assertNextSiblingIndexIsValidGivenInitialBlocks(nextSiblingIndex);

    const blockAIndex = this.getMovedBlockIndex(element);
    const blockBIndex = this.getBlockIndexGivenNextSiblingIndex(nextSiblingIndex);

    this.swapBlockDataAndNotify(blockAIndex, blockBIndex);
  };

  assertNextSiblingIndexIsValidGivenInitialBlocks = (nextSiblingIndex) => {
    if (nextSiblingIndex === 0 || nextSiblingIndex > this.props.initialBlocks.length) {
      throw new Error('invalid nextSiblingIndex given the current blocks array');
    }
  };

  getNewBlockIndexGivenNextSiblingIndex = (nextSibling) => nextSibling === -1 ? this.props.initialBlocks.length : nextSibling - 1;

  getBlockIndexGivenNextSiblingIndex = (nextSibling) => nextSibling === -1 ? this.props.initialBlocks.length - 1 : nextSibling - 1;

  buildNewBlockDataGivenClonedElement = (element) => {
    return {
      type: element.getAttribute('data-block-type'),
      id: uuid(),
      expanded: true,
      valid: true
    };
  };

  getMovedBlockIndex = (element) => {
    const blocks = this.props.initialBlocks;
    const id = element.getAttribute('data-block-id');

    return blocks.findIndex(block => block.id === id);
  };

  addBlockDataToTheDesignAndNotify = (newBlock, newBlockIndex) => {
    const blocks = this.props.initialBlocks;

    blocks.splice(newBlockIndex, 0, newBlock);

    this.props.onChange(blocks);
  };

  swapBlockDataAndNotify = (a, b) => {
    const blocks = this.props.initialBlocks;
    const temp = blocks[a];

    blocks[a] = blocks[b];
    blocks[b] = temp;

    this.props.onChange(blocks);
  };

  removeBlockDataByIdAndNotify = id => {
    const blocks = this.props.initialBlocks;
    const blockToRemoveIndex = blocks.findIndex(data => data.id === id);

    blocks.splice(blockToRemoveIndex, 1);

    this.props.onChange(blocks);
  };

  render() {
    return (
      <Row className="project-design-editor-container">
        <Col md="6" lg="4">
          <BlocksColumn componentsContainerRef={this.toolsBlocksRef}
                        title="Available blocks"
                        blockDefinitionsMap={blockDefinitionsMap}
                        blocksList={tools}
                        expandable={false}/>
        </Col>

        <Col md="6" lg="8">
          <BlocksColumn componentsContainerRef={this.designBlocksRef}
                        title="Your project design"
                        blockDefinitionsMap={blockDefinitionsMap}
                        blocksList={this.props.initialBlocks}
                        expandable={true}
                        onChange={blocks => this.props.onChange(blocks)}/>
        </Col>
      </Row>
    );
  }
}
