import React from "react";

import ResultDownloader from "./ResultDownloader";
import {ProgressBar} from "react-bootstrap";
import LoadingButton from "../../../../../common/LoadingButton";

export default ({runnable, downloadNameFactory, downloadLinkFactory, start, isStarting}) => (
  <div>
    <ResultDownloader downloadLinkFactory={downloadLinkFactory}
                      downloadNameFactory={downloadNameFactory}
                      runnable={runnable}/>

    {
      runnable.isLatestRunRunning() &&
      <RunsProgressBar/>
    }

    <LoadingButton block onClick={start} isSaving={isStarting}>Start</LoadingButton>
  </div>
);

const RunsProgressBar = ({runnable}) => {
  const finishedPercentage = Math.ceil(runnable.getFinishedBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  const runningPercentage = Math.ceil(runnable.getRunningBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  return (
    <ProgressBar className="mb-2">
      <ProgressBar animated variant="primary"
                   now={Math.max(1, finishedPercentage)} key={1}/>
      <ProgressBar animated variant="success"
                   now={runningPercentage} key={2}/>
    </ProgressBar>
  );
};
