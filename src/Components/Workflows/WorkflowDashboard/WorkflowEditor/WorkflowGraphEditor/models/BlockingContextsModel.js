export const DEFAULT_WORKER_BLOCKED_MESSAGE =  "<p><h1>Thank you</h1>You've already worked on another job related to this project</p>";

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

  getBlockingContextById (id) {
    return this.getContexts().find(context => context.id === id)
  }

  removeContext(toRemove) {
    const index = this.contexts.indexOf(toRemove);
    if (index >= 0) {
      this._disableBlockingContext(toRemove);
      this.contexts.splice(index, 1);
    }
  }

  _disableBlockingContext(context) {
    // TODO: Search all do block that use this and disable
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
    name: 'Default',
    color: '#ffaff3',
    workerBlockedMessage: "<p><h1>Thank you</h1>You've already worked on another job related to this project</p>"
  });

  _enableContextForAllDoBlocks() {

  }

  removeAllBlockingContexts() {
    this.contexts.forEach(context => this.removeContext(context));
  }

  isSignleBlockingContextEnabledForAllDoBlocks() {

  }

  areSomeBlockingContextsEnabled() {

  }


}
