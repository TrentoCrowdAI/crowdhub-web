import {DefaultNodeModel} from "storm-react-diagrams";
import {deSerializeParameters, serializeParameters} from "../../ParametersEngine/parameters/serialization";
import uuid from "uuid";
import {RunStates, States} from "../../../../../../models/RunnableWorkflow";

const {RUNTIME_ERROR, RUNNING, FINISHED} = RunStates;

export class BlockNodeModel extends DefaultNodeModel {

  label;
  blockTypeDefinition;
  initialParametersMap;
  parameterModelsMap;

  latestBlockRun;
  blockRuns = [];

  deSerialize(block, engine) {
    if (!block.id) {
      this.initializeBlockWithIds(block, engine);
    }
    super.deSerialize(block, engine);
    this.setLabel(block.label);
    this.blockTypeDefinition = engine.getBlockTypeDefinition(block.type);
    this.initialParametersMap = block.parameters || {};
    this.setParameterModelsMap(deSerializeParameters(this, this.getParameterDefinitionList()));
  }

  initializeBlockWithIds(block, engine) {
    block.id = uuid();
    block.label = engine.getModel().getNextBlockLabel();
    block.ports = block.ports.map(port => ({
      ...port,
      id: uuid()
    }));
  }

  serialize() {
    return {
      ...super.serialize(),
      label: this.getLabel(),
      type: this.blockTypeDefinition.name,
      parameters: serializeParameters(this.getParameterModelsMap())
    }
  }

  isValid = () => Object.values(this.getParameterModelsMap()).find(parameter => !parameter.isValid()) == null;

  getId = () => this.id;

  getLabel = () => this.label;

  setId = (id) => this.id = id;

  setLabel = (label) => this.label = label;

  getParameterModelsMap = () => this.parameterModelsMap;

  setParameterModelsMap(parameterModelsMap) {
    this.parameterModelsMap = parameterModelsMap;
  }

  getParameterDefinitionList = () => this.blockTypeDefinition.parameterDefinitions;

  getInitialParametersMap = () => this.initialParametersMap;

  setBlockRuns = (latestBlockRun, blockRuns) => {
    this.latestBlockRun = latestBlockRun;
    this.blockRuns = blockRuns;
  };

  getBlockRuns = () => this.blockRuns;

  /**
   * @returns {boolean} true if the block was started at least one time.
   */
  wasStarted = () => !!this.latestBlockRun;

  isLatestRunFinished = () => this.wasStarted() && this.latestBlockRun.state === FINISHED;

  isLatestRunRunning = () => this.wasStarted() && this.latestBlockRun.state === RUNNING;

  isLatestRunRuntimeError = () => this.wasStarted() && this.latestBlockRun.state === RUNTIME_ERROR;

  getFinishedRunsCount = () => this.getFinishedRuns().length;

  getFinishedRuns = () => this.getBlockRuns().filter(run => run.state === FINISHED);

  /**
   * @returns {number} number of blocks that may start in a run. That is, the number of all parents (ascendents)
   */
  getRunnableBlocksCount = () => 1 + BlockNodeModel.getAllParentBlocks(this).length;

  /**
   * @returns {number} number of all parents (ascendents) running
   */
  getRunningBlocksCount = () =>
    [this, ...BlockNodeModel.getAllParentBlocks(this)]
      .filter(block => block.isLatestRunRunning())
      .length;

  /**
   * @returns {number} number of all parents (ascendents) finished
   */
  getFinishedBlocksCount = () =>
    [this, ...BlockNodeModel.getAllParentBlocks(this)]
      .filter(block => block.isLatestRunFinished())
      .length;


  /**
   * @returns {NodeModel[]} parent blocks of this block
   */
  getParentBlocks = () =>
    Object.values(this.getPort('in').getLinks())
      .map(link => link.getSourcePort().getNode());

  /**
   * Recursively finds all the parents (ascendents) of a block.
   * @param block
   * @param parents array of parents already found
   * @returns {Array} all the parents of a block
   */
  static getAllParentBlocks = (block, parents = []) => {
    const blockParents = block.getParentBlocks();
    if (blockParents.length > 0) {
      parents.push(...blockParents);
      blockParents.forEach(parent => BlockNodeModel.getAllParentBlocks(parent, parents));
    }
    return parents;
  }

}

