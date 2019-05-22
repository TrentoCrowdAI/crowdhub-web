import React, {Component} from "react";

import CacheService from "../../../../../../Services/rest/CacheService";
import RunsControls from "../RunsControls/RunsControls";

export default class BlockRunsControls extends Component {
  render() {
    const {blockModel} = this.props;

    /**
     * NOTE: When you'll implement the start block feature, take a look at how the start workflow is implemented
     */
    return <RunsControls runnable={blockModel}
                         downloadLinkFactory={(run, format) => CacheService.getDownloadLink(run.getCacheId(), format)}
                         startText="Start block"
                         onStart={() => console.error('not implemented yet')}
                         isStarting={false}/>;
  }
}
