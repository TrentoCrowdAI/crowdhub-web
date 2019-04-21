import React, {Component} from 'react';
import WorkflowEditor from "./WorkflowEditor/WorkflowEditor";
import {makeCancellable} from "../../../Services/utils";
import ProjectsService from "../../../Services/ProjectsService";

export default class WorkflowDashboard extends Component {


  state = {
    blockTypes: [{
      id: 1,
      data: {
        type: 'do',

        nodeDefinition: {
          type: 'blockNode',
          ports: [
            {
              type: "default",
              name: "asp",
              in: true,
              label: "In"
            }, {
              type: "default",
              name: "out",
              out: true,
              label: "Out"
            }
          ],
          name: "Do",
          color: "rgb(0,192,255)"
        },

        parameters: [
          {
            name: 'reward',
            displayName: 'Reward',
            description: 'Cents of dollars',
            default: 3,
            required: true,
            type: 'number'
          },
          {
            name: 'maxVotes',
            displayName: 'Max votes',
            description: 'Max votes per performer',
            default: 3,
            required: true,
            type: 'number'
          },
          {
            name: 'numVotes',
            displayName: 'Number of votes',
            description: 'Number of votes per each job',
            default: 3,
            required: true,
            type: 'number'
          }]
      }
    }, {
      id: 2,
      data: {
        type: 'QRand',

        nodeDefinition: {
          type: "blockNode",
          "ports": [
            {
              "type": "default",
              "name": "Output",
              "out": true,
              "label": "Out"
            }
          ],
          "name": "QRand",
          "color": "rgb(0,192,255)"
        },

        parameters: []
      }
    }],

    workflow: {}
  };


  componentDidMount = () => this.fetchWorkflow();

  componentWillUnmount = () => this.pendingWorkflowRequest.cancel();

  async fetchWorkflow() {
    const id = this.props.match.params.id;

    try {
      this.pendingWorkflowRequest = makeCancellable(ProjectsService.getProject(id));
      const project = await this.pendingWorkflowRequest.result;

      this.setState({project});
    } catch (e) {
      // TODO: redirectToProjectsList(this);
    }
  }

  onWorkflowEdited = (workflow) => this.setState({workflow});

  render() {
    return <WorkflowEditor blockTypes={this.state.blockTypes}
                           workflow={this.state.workflow}
                           onWorkflowEdited={this.onWorkflowEdited}/>;
  }
}
