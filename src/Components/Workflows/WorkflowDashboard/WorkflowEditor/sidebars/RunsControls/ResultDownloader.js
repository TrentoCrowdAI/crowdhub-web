import React from "react";
import {ButtonGroup, Dropdown, Form} from "react-bootstrap";


export default ({runnable, downloadNameFactory, downloadLinkFactory}) => {
  const latestRun = runnable.getFinishedRuns()[0];
  return (
    <Form.Group>
      <Form.Text className="text-muted">
        Download results as a CSV file.
      </Form.Text>
      <Dropdown as={ButtonGroup} className="btn-block">
        <a className="btn btn-success" style={{color: 'white'}}
           href={downloadLinkFactory(latestRun)}
           download={downloadNameFactory(latestRun)}>
          {
            runnable.isLatestRunRunning() ?
              `Download #${latestRun.id}` :
              'Download latest results'
          }
        </a>

        <Dropdown.Toggle split variant="success"/>

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
    </Form.Group>
  );
};
