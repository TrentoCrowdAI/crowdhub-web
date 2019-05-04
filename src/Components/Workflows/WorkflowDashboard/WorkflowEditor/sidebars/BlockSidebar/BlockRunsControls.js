import React, {Component} from "react";
import ResultDownloader from "../RunsControls/ResultDownloader";
import CacheService from "../../../../../../Services/rest/CacheService";

export default class BlockRunsControls extends Component {
  render() {
    const {blockModel} = this.props;
    return (
      <div>
        <ResultDownloader downloadLinkFactory={run => CacheService.getDownloadLink(run.cacheId)}
                          downloadNameFactory={run => `${blockModel.getLabel()} #${run.id}.csv`}
                          runnable={blockModel}/>
      </div>
    );
  }
}
