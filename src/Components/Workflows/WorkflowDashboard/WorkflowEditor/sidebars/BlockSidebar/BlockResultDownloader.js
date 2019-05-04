import React from "react";
import {Dropdown, Form, Button, ButtonGroup} from "react-bootstrap";
import CacheService from "../../../../../../Services/rest/CacheService";


/**
 * Results of this block aren't available because it's never been ran
 * Results of this block aren't available because it's running
 * Download results of the block as a CSV file.
 * Download results of the block as a CSV file. (running
 */
export default ({blockModel}) => (
  <Form.Group>
    <Form.Label>Results</Form.Label>
    {
      !blockModel.wasBlockStarted() &&
      <BlockNeverRanBefore/>
    }
    {
      blockModel.isLatestRunRunning() && blockModel.getFinishedRunsCount() === 0 &&
      <BlockRunning/>
    }
    {
      blockModel.isLatestRunRuntimeError() && blockModel.getFinishedRunsCount() === 0 &&
      <BlockRuntimeError/>
    }
    {
      blockModel.getFinishedRunsCount() > 0 &&
      <DownloadButton blockModel={blockModel}/>
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

const DownloadButton = ({blockModel}) => {
  const latestRun = blockModel.getFinishedRuns()[0];
  return (
    <div>
      <Form.Text className="text-muted">
        Download results of the block as a CSV file.
      </Form.Text>
      <Dropdown as={ButtonGroup} className="btn-block">
        <a className="btn btn-success" style={{color: 'white'}}
           href={CacheService.getDownloadLink(latestRun.cacheId)}
           download={getCacheFileName(blockModel, latestRun)}>
          {
            blockModel.isLatestRunRunning() ?
              `Download ${latestRun.id}` :
              'Download latest results'
          }
        </a>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

        <Dropdown.Menu>
          {
            blockModel.getFinishedRuns().map((run, index) => (
              <Dropdown.Item key={run.id}
                             href={CacheService.getDownloadLink(run.cacheId)}
                             download={getCacheFileName(blockModel, run)}>
                #{run.id} {index === 0 && blockModel.isLatestRunCompleted() ? '- Latest ' : ''}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const getCacheFileName = (blockModel, run) => `${blockModel.getLabel()} #${run.id}.csv`;
