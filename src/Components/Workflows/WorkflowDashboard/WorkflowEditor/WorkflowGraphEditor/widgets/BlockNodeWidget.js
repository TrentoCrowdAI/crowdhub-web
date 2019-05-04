import React from 'react';
import {DefaultNodeWidget, PortWidget} from "storm-react-diagrams";
import {Card, Spinner} from "react-bootstrap";
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

          <div className="flags-container">
            {
              /* completed */
              this.props.node.isCompleted() &&
              <i className="fas fa-check-circle"/>
            }


            {
              /* running */
              this.props.node.isRunning() &&
              <Spinner animation="grow" size="sm"/>
            }


            {
              /* runtime error */
              this.props.node.isRuntimeError() &&
              <i className="fas fa-exclamation-circle error"/>

            }

            {
              /* invalid block parameters */
              !this.props.node.isValid() &&
              <i className="fas fa-exclamation-triangle error"/>
            }
          </div>
        </Card.Header>
      </Card>
    );
  }
}

