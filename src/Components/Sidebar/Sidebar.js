import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import RunsService from '../../Services/rest/RunsService';
import { WORKFLOWS_PATH } from '../Workflows/Workflows';

const MAX_RUNS_IN_LIST = 5;

export default class Sidebar extends Component {
  state = {
    runs: null
  };

  componentDidMount = () => this.fetchRuns();

  async fetchRuns() {
    try {
      const runs = await RunsService.getRuns();
      this.setState({ runs });
    } catch (e) {
      // TODO: Handle error
    }
  }

  render() {
    return (
      <nav id="sidebar" className={this.props.sidebarOpen ? 'open' : ''}>
        <h2 className="app-title">CrowdHub</h2>

        <ul className="sidebar-list">
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>

          <li>
            <LatestFinishedRunsList runs={this.state.runs} />
          </li>

          <li>
            <RunningRunsList runs={this.state.runs} />
          </li>
        </ul>
      </nav>
    );
  }
}

const LatestFinishedRunsList = ({ runs }) => {
  if (!runs) {
    return <p>Fetching latest finished runs ...</p>;
  }
  return (
    <div>
      Latest finished runs
      <JobsList runs={runs.getFinishedRuns().slice(0, MAX_RUNS_IN_LIST)} />
    </div>
  );
};

const RunningRunsList = ({ runs }) => {
  if (!runs) {
    return <p>Fetching running runs ...</p>;
  }
  return (
    <div>
      Running runs
      <JobsList runs={runs.getRunningRuns().slice(0, MAX_RUNS_IN_LIST)} />
    </div>
  );
};

const JobsList = ({ runs }) => (
  <ul>
    {runs.map(run => (
      <li key={run.id}>
        <NavLink to={`${WORKFLOWS_PATH}/${run.getWorkflowId()}`}>
          #{run.id}
        </NavLink>
      </li>
    ))}
  </ul>
);
