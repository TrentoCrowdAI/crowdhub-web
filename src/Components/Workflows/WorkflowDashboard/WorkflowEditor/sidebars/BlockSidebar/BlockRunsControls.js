import React, {Component} from "react";

import CacheService from "../../../../../../Services/rest/CacheService";
import RunsControls from "../RunsControls/RunsControls";

export default class BlockRunsControls extends Component {
  render() {
    const {blockModel} = this.props;
    return <RunsControls runnable={blockModel}
                         downloadLinkFactory={run => CacheService.getDownloadLink(run.getCacheId())}
                         downloadNameFactory={run => `${blockModel.getLabel()} #${run.getRunId()}.csv`}
                         startText="Start block"
                         start={() => console.error('not implemented yet')}
                         isStarting={false}/>;
  }
}
