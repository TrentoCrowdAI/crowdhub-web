import React, {Component} from 'react';
import {
  GraphView
} from 'react-digraph';


const GraphConfig =  {
  NodeTypes: {
    custom: {
      typeText: "Block",
      shapeId: "#workflowBlock",
      shape: (
        <symbol viewBox="-27 0 154 154" id="workflowBlock" width="154" height="154">
          <rect transform="" width="109" height="109" />
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
        </symbol>
      )
    }
  }
};


export default class WorkflowGraphEditorOld extends Component {
  state = {
    graph: {
      "nodes": [
        {
          "id": 1,
          "title": "Node A",
          "x": 258.3976135253906,
          "y": 331.9783248901367,
          "type": "workflowBlock"
        },
        {
          "id": 2,
          "title": "Node B",
          "x": 593.9393920898438,
          "y": 260.6060791015625,
          "type": "workflowBlock"
        },
        {
          "id": 3,
          "title": "Node C",
          "x": 237.5757598876953,
          "y": 61.81818389892578,
          "type": "workflowBlock"
        },
        {
          "id": 4,
          "title": "Node C",
          "x": 600.5757598876953,
          "y": 600.81818389892578,
          "type": "workflowBlock"
        }
      ],
      "edges": [
        {
          "source": 1,
          "target": 2,
          "type": "emptyEdge"
        },
        {
          "source": 2,
          "target": 4,
          "type": "emptyEdge"
        }
      ]
    },
    selected: {}
  };

  render() {
    const NODE_KEY = "id"

    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.state.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    return (
      <div style={{'height': '80vh'}}>
        <GraphView ref='GraphView'
                   nodeKey={NODE_KEY}
                   nodes={nodes}
                   edges={edges}
                   selected={selected}
                   nodeTypes={NodeTypes}
                   nodeSubtypes={NodeSubtypes}
                   edgeTypes={EdgeTypes}/>
      </div>
    );
  }
}
