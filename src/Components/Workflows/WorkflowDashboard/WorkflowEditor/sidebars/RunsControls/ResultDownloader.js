import React, {Component} from "react";
import {ButtonGroup, ButtonToolbar, Dropdown, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import './ResultDownloader.css';

// TODO: Move this declaration on Service
const DownloadFormats = ['json', 'csv'];

export default class ResultDownloader extends Component {

  state = {
    downloadFormat: DownloadFormats[0]
  };

  onChangeDownloadFormat = (downloadFormat) => this.setState({downloadFormat});

  render() {
    const {runnable, downloadLinkFactory} = this.props;
    if (runnable.getFinishedRuns().length <= 0) {
      return (
        <NoResultsMessage/>
      );
    }
    const selectedFormat = this.state.downloadFormat;
    const latestFinishedRun = runnable.getFinishedRuns()[0];
    return (
      <div>
        Download results as

        <ButtonToolbar className="mt-2 mb-1 format-toggle-group">
          <ToggleButtonGroup type="radio"
                             name="downloadFormat"
                             defaultValue={DownloadFormats[0]}
                             onChange={this.onChangeDownloadFormat}>
            {
              DownloadFormats.map(format => (
                <ToggleButton key={format} value={format}>{format.toUpperCase()}</ToggleButton>
              ))
            }
          </ToggleButtonGroup>
        </ButtonToolbar>

        <Dropdown as={ButtonGroup} className="btn-block">
          <LatestDownloadButton link={downloadLinkFactory(latestFinishedRun, selectedFormat)}
                                isLatest={!runnable.isRunning()}
                                id={latestFinishedRun.getRunId()}/>

          <Dropdown.Toggle split variant="success"/>

          <Dropdown.Menu>
            {
              runnable.getFinishedRuns().map((run, index) => (
                <DropdownDownload key={run.getRunId()}
                                  link={downloadLinkFactory(run, selectedFormat)}
                                  isLatest={!runnable.isRunning() && index === 0}
                                  id={run.getRunId()}/>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export const NoResultsMessage = () => (<span>No results available yet</span>);

export const LatestDownloadButton = ({link, isLatest, id}) => (
  <a className="btn btn-success" style={{color: 'white'}} href={link} target="_blank">
    {isLatest ? 'Download latest results' : `Download #${id}`}
  </a>
);

export const DropdownDownload = ({link, isLatest, id}) => (
  <Dropdown.Item href={link} target="_blank">
    #{id} {isLatest ? '- Latest ' : ''}
  </Dropdown.Item>
);
