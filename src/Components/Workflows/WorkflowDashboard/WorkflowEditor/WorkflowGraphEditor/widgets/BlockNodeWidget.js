import React from 'react';
import {DefaultNodeWidget, PortWidget} from "storm-react-diagrams";
import {Card} from "react-bootstrap";
import './BlockNode.css';

export class BlockNodeWidget extends DefaultNodeWidget {

  render() {
    return (
      <Card className="block">
        <Card.Header>
          <PortWidget name="in" node={this.props.node}/>

          <div className="block-name">
            {this.props.node.name}
          </div>

          <PortWidget name="out" node={this.props.node}/>

          {
            /* Error warning */
            !this.props.node.isValid() &&
            <div className="error-triangle-container">
              <i className="fas fa-exclamation-triangle"/>
            </div>
          }
        </Card.Header>
      </Card>
    );
  }
}

