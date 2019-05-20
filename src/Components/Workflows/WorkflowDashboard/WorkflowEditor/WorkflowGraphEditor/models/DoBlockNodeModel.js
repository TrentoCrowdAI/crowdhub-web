import {DefaultBlockNodeModel} from "./DefaultBlockNodeModel";
import {DoBlockRunAdapter} from "../../../../../../Services/RunnableWorkflowService/adapters/DoBlockRunAdapter";

export class DoBlockNodeModel extends DefaultBlockNodeModel {


  setRuns(runs) {
    this._runs = runs;
    this.latestBlockRun = runs.getLatestRun() ? new DoBlockRunAdapter(runs.getLatestRun(), this.getId()) : null;
    this.blockRuns = DoBlockRunAdapter.adaptRuns(runs, this.getId());
  }


  getColor () {
    const blockingContextModel = this.getBlockingContextModelParameter();
    if (!blockingContextModel.isBlockingContextSelected()) {
      return super.getColor();
    }
    return this.getBlockingContexts().getBlockingContextById(
      blockingContextModel.getBlockingContextId()
    ).color;
  }

  getBlockingContextModelParameter () {
    return this.getParameterModelsMap()['blockingContextId'];
  }

  getBlockingContexts () {
    return this.parent.getBlockingContexts();
  }
}


