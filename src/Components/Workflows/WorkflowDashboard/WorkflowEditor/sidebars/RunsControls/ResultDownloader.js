import React from "react";
import {ButtonGroup, Dropdown} from "react-bootstrap";


export default ({runnable, downloadNameFactory, downloadLinkFactory}) => {
  const latestRun = runnable.getLatestRun();
  return (
    <div>
      Download results as a CSV file
      <Dropdown as={ButtonGroup} className="btn-block">
        <a className="btn btn-success" style={{color: 'white'}}
           href={downloadLinkFactory(latestRun)}
           download={downloadNameFactory(latestRun)}>
          {
            runnable.isRunning() ?
              `Download #${latestRun.getRunId()}` :
              'Download latest results'
          }
        </a>

        <Dropdown.Toggle split variant="success"/>

        <Dropdown.Menu>
          {
            runnable.getFinishedRuns().map((run, index) => (
              <Dropdown.Item key={run.getRunId()}
                             href={downloadLinkFactory(run)}
                             download={downloadNameFactory(run)}>
                #{run.getRunId()} {index === 0 && runnable.isFinished() ? '- Latest ' : ''}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
