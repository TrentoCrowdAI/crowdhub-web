import {DefaultNodeModel} from "storm-react-diagrams";
import {deSerializeParameters, serializeParameters} from "../../ParametersEngine/parameters/serialization";
import uuid from "uuid";

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

  getParameterModelsMap() {
    return this.parameterModelsMap;
  }

  setParameterModelsMap(parameterModelsMap) {
    this.parameterModelsMap = parameterModelsMap;
  }

  getParameterDefinitionList() {
    return this.blockTypeDefinition.parameterDefinitions;
  }

  getInitialParametersMap() {
    return this.initialParametersMap;
  }

  setBlockRuns = (latestBlockRun, blockRuns) => {
    this.latestBlockRun = latestBlockRun;
    this.blockRuns = blockRuns;
  };

  getBlockRuns = () => this.blockRuns;

  wasBlockStarted = () => !!this.latestBlockRun;

  isLatestRunCompleted = () => this.wasBlockStarted() && this.latestBlockRun.state === 'finished';

  isLatestRunRunning = () => this.wasBlockStarted() && this.latestBlockRun.state === 'running';

  isLatestRunRuntimeError = () => this.wasBlockStarted() && this.latestBlockRun.state === 'runtimeError';

  getFinishedRunsCount = () => this.getFinishedRuns().length;

  getFinishedRuns = () => this.getBlockRuns().filter(run => run.state === 'finished');

}

