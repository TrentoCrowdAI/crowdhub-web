import React, {Component} from "react";

import CacheService from "../../../../../../Services/rest/CacheService";
import RunsControls from "../RunsControls/RunsControls";

export default class BlockRunsControls extends Component {
  render() {
    const {blockModel} = this.props;
    return <RunsControls runnable={blockModel}
                         downloadLinkFactory={run => CacheService.getDownloadLink(run.cacheId)}
                         downloadNameFactory={run => `${blockModel.getLabel()} #${run.id}.csv`}
                         start={null}
                         isStarting={false}/>;
  }
}
