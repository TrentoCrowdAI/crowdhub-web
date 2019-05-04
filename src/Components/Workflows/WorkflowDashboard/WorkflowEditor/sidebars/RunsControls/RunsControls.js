import React from "react";

import ResultDownloader from "./ResultDownloader";
import {ProgressBar} from "react-bootstrap";
import LoadingButton from "../../../../../common/LoadingButton";

export default ({runnable, downloadNameFactory, downloadLinkFactory, onStart, isStarting, startText}) => (
  <div>

    {
      runnable.isLatestRunRunning() &&
      <div>
        Workflow is running. In the meanwhile Youou can download the results of previously finished runs.
        <RunsProgressBar runnable={runnable}/>
      </div>
    }


    <ResultDownloader downloadLinkFactory={downloadLinkFactory}
                      downloadNameFactory={downloadNameFactory}
                      runnable={runnable}/>

    {
      !runnable.isLatestRunRunning() &&
      <LoadingButton block onClick={onStart}
                     isSaving={isStarting}>{startText}</LoadingButton>
    }
  </div>
);

const RunsProgressBar = ({runnable}) => {
  const finishedPercentage = Math.ceil(runnable.getFinishedBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  const runningPercentage = Math.ceil(runnable.getRunningBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  return (
    <ProgressBar className="mb-2" style={{backgroundColor: 'lightgray'}}>
      <ProgressBar animated variant="primary"
                   now={Math.max(1, finishedPercentage)} key={1}/>
      <ProgressBar animated variant="success"
                   now={runningPercentage} key={2}/>
    </ProgressBar>
  );
};
