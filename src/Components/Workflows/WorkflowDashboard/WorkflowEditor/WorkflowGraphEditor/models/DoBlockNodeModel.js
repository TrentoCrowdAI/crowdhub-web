import {DefaultBlockNodeModel} from "./DefaultBlockNodeModel";
import {DoBlockRunAdapter} from "../../../../../../adapters/DoBlockRunAdapter";

export class DoBlockNodeModel extends DefaultBlockNodeModel {


  setRuns(runs) {
    this._runs = runs;
    this.latestBlockRun = runs.getLatestRun() ? new DoBlockRunAdapter(runs.getLatestRun(), this.getId()) : null;
    this.blockRuns = DoBlockRunAdapter.adaptRuns(runs, this.getId());
  }

}


