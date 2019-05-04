import React from "react";
import {Dropdown, Form, ButtonGroup} from "react-bootstrap";


/**
 * Results of this block aren't available because it's never been ran
 * Results of this block aren't available because it's running
 * Download results of the block as a CSV file.
 * Download results of the block as a CSV file. (running
 */
export default ({runnable, downloadNameFactory, downloadLinkFactory}) => (
  <Form.Group>
    <Form.Label>Results</Form.Label>
    {
      !runnable.wasStarted() &&
      <BlockNeverRanBefore/>
    }
    {
      runnable.isLatestRunRunning() && runnable.getFinishedRunsCount() === 0 &&
      <BlockRunning/>
    }
    {
      runnable.isLatestRunRuntimeError() && runnable.getFinishedRunsCount() === 0 &&
      <BlockRuntimeError/>
    }
    {
      runnable.getFinishedRunsCount() > 0 &&
      <DownloadButton runnable={runnable}
                      downloadNameFactory={downloadNameFactory}
                      downloadLinkFactory={downloadLinkFactory}/>
    }
  </Form.Group>
);

const BlockNeverRanBefore = () => (
  <Form.Text className="text-muted">
    Results of this block aren't available because it's never been ran
  </Form.Text>
);

const BlockRunning = () => (
  <Form.Text className="text-muted">
    Results of this block aren't available because it's running
  </Form.Text>
);

const BlockRuntimeError = () => (
  <Form.Text className="text-muted">
    Results of this block aren't available because every time it ran failed
  </Form.Text>
);

const DownloadButton = ({runnable, downloadNameFactory, downloadLinkFactory}) => {
  const latestRun = runnable.getFinishedRuns()[0];
  return (
    <div>
      <Form.Text className="text-muted">
        Download results as a CSV file.
      </Form.Text>
      <Dropdown as={ButtonGroup} className="btn-block">
        <a className="btn btn-success" style={{color: 'white'}}
           href={downloadLinkFactory(latestRun)}
           download={downloadNameFactory(latestRun)}>
          {
            runnable.isLatestRunRunning() ?
              `Download ${latestRun.id}` :
              'Download latest results'
          }
        </a>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

        <Dropdown.Menu>
          {
            runnable.getFinishedRuns().map((run, index) => (
              <Dropdown.Item key={run.id}
                             href={downloadLinkFactory(run)}
                             download={downloadNameFactory(run)}>
                #{run.id} {index === 0 && runnable.isLatestRunFinished() ? '- Latest ' : ''}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
