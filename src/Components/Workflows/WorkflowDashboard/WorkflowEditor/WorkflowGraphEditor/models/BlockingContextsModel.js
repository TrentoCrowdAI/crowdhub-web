import {DoBlockNodeModel} from "./DoBlockNodeModel";

export const DEFAULT_WORKER_BLOCKED_MESSAGE = "<p><h1>Thank you</h1>You've already worked on another job related to this project</p>";

export default class BlockingContextsModel {

  graphModel;
  contexts = [];

  constructor(graphModel) {
    this.graphModel = graphModel;
  }

  deSerialize(contexts) {
    this.setContexts(contexts);
  }

  setContexts(contexts) {
    this.contexts = contexts;
  }

  serialize() {
    return this.getContexts();
  }

  getContexts() {
    return this.contexts;
  }

  getBlockingContextById(id) {
    return this.getContexts().find(context => context.id === id)
  }

  removeContext(toRemove) {
    const index = this.contexts.indexOf(toRemove);
    if (index >= 0) {
      this._disableContextForAllDoBlocks(toRemove);
      this.contexts.splice(index, 1);
    }
  }

  addContext(context) {
    this.contexts.push(context);
  }

  mutateToSingleBlockingContextForAllDoBlocks() {
    this.removeAllBlockingContexts();
    const context = BlockingContextsModel.getDefaultContext();
    this.addContext(context);
    this._enableContextForAllDoBlocks(context);
  }

  static getDefaultContext = () => ({
    id: 'default-blocking-context',
    name: 'Default',
    color: '#ffaff3',
    workerBlockedMessage: "<p><h1>Thank you</h1>You've already worked on another job related to this project</p>"
  });

  _enableContextForAllDoBlocks = (context) =>
    this.getBlockingContextModelsOfDoBlocks()
      .forEach(blockingContextModel => blockingContextModel.setBlockingContextId(context.id));

  getBlockingContextModelsOfDoBlocks = () => this.getDoBlockModels()
    .map(block => block.getBlockingContextModelParameter());

  getDoBlockModels() {
    return this.graphModel.getBlocksArray().filter(block => block instanceof DoBlockNodeModel);
  }

  removeAllBlockingContexts() {
    this.contexts.forEach(context => {
      this._disableContextForAllDoBlocks(context);
      this.removeContext(context)
    });
  }

  _disableContextForAllDoBlocks = (context) =>
    this.getBlockingContextModelsOfDoBlocks()
      .filter(blockingContextModel => blockingContextModel.getBlockingContextId() === context.id)
      .forEach(blockingContextModel => blockingContextModel.setBlockingContextId(null));


  isSingleBlockingContextEnabledForAllDoBlocks = () => {
    const onlyOneContext = this.getContexts().length === 1;
    const blocks = this.graphModel.getBlocksArray();
    const blocksWithEnabledBlockingContext = this.getBlockingContextModelsOfDoBlocks()
      .filter(blockingContextModel => !!blockingContextModel.getBlockingContextId());
    return onlyOneContext && blocks.length === blocksWithEnabledBlockingContext.length;
  };


  areSomeBlockingContextsEnabled = () =>
    this.getBlockingContextModelsOfDoBlocks()
      .filter(blockingContextModel => !!blockingContextModel.getBlockingContextId())
      .length > 0;

}


export const isBlockingContextValid = ({name, workerBlockedMessage}) =>
  name && name.length >= 0 && workerBlockedMessage
  && workerBlockedMessage.length >= 0;
