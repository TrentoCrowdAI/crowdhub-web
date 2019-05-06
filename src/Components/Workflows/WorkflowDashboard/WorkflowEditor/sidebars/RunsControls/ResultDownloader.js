import React from "react";
import {ButtonGroup, Dropdown} from "react-bootstrap";


export default ({runnable, downloadNameFactory, downloadLinkFactory}) => {
  if (runnable.getFinishedRuns().length <= 0) {
    return (
      <NoResultsMessage/>
    );
  }
  const latestFinishedRun = runnable.getFinishedRuns()[0];
  return (
    <div>
      Download results as a CSV file
      <Dropdown as={ButtonGroup} className="btn-block">
        <LatestDownloadButton link={downloadLinkFactory(latestFinishedRun)}
                              downloadName={downloadNameFactory(latestFinishedRun)}
                              isLatest={!runnable.isRunning()}
                              id={latestFinishedRun.getRunId()}/>

        <Dropdown.Toggle split variant="success"/>

        <Dropdown.Menu>
          {
            runnable.getFinishedRuns().map((run, index) => (
              <DropdownDownload key={run.getRunId()}
                                link={downloadLinkFactory(run)}
                                downloadName={downloadNameFactory(run)}
                                isLatest={!runnable.isRunning() && index === 0}
                                id={run.getRunId()}/>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export const NoResultsMessage = () => (<span>No results available yet</span>);

export const LatestDownloadButton = ({link, downloadName, isLatest, id}) => (
  <a className="btn btn-success" style={{color: 'white'}} href={link} download={downloadName}>
    {isLatest ? 'Download latest results' : `Download #${id}`}
  </a>
);

export const DropdownDownload = ({link, downloadName, isLatest, id}) => (
  <Dropdown.Item href={link} download={downloadName}>
    #{id} {isLatest ? '- Latest ' : ''}
  </Dropdown.Item>
);
