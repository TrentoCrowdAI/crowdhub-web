import {DefaultNodeModel} from "storm-react-diagrams";
import {deSerializeParameters, serializeParameters} from "../../ParametersEngine/parameters/serialization";
import uuid from "uuid";
import Runs from "../../../../../../models/Runs";


export class BlockNodeModel extends DefaultNodeModel {

  label;
  blockTypeDefinition;
  initialParametersMap;
  parameterModelsMap;

  latestBlockRun;
  blockRuns = [];
  _runs = new Runs([]);

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

  setRuns (runs){
    this._runs = runs;
    this.latestBlockRun = runs.getLatestRun() ? runs.getLatestRun().getBlockRun(this.getId()) : null; // TODO: To clear
    this.blockRuns = runs.getBlockRuns(this.getId());
  };


  getBlockRuns = () => this.blockRuns;

  getLatestRun = () => this.latestBlockRun;


  /**
   * @returns {boolean} true if the block was started at least one time.
   */
  wasStarted = () => !!this.latestBlockRun;

  isRunning = () => this.wasStarted() && this.getLatestRun().isRunning();

  isFailed = () => this.wasStarted() && this.getLatestRun().isFailed();

  isFinished = () => this.wasStarted() && this.getLatestRun().isFinished();


  /**
   * @returns {number} number of blocks that may start in a run
   */
  getRunnableBlocksCount = () => 1 + BlockNodeModel.getAllParentBlocks(this).length;

  /**
   * Relative to latest run
   * @returns {number} number of blocks that are running
   */
  getRunningBlocksCount = () =>
    [this, ...BlockNodeModel.getAllParentBlocks(this)]
      .filter(block => block.isRunning())
      .length;

  /**
   * Relative to latest run
   * @returns {number} number of finished blocks
   */
  getFinishedBlocksCount = () =>
    [this, ...BlockNodeModel.getAllParentBlocks(this)]
      .filter(block => block.isFinished())
      .length;

  // TODO: clear
  canStart = () => !this.isRunning() && (this._runs.getLatestRun() == null || !this._runs.getLatestRun().isRunning());

  canBeEdited = () => !this.isRunning();


  getFinishedRuns = () => this.blockRuns.filter(blockRun => blockRun.isFinished());


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
  };

}

