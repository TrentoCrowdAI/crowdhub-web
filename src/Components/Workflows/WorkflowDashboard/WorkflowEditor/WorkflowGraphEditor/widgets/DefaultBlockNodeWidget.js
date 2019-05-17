import React from 'react';
import {DefaultNodeWidget, PortWidget} from "storm-react-diagrams";
import {Card, Spinner} from "react-bootstrap";
import './DefaultBlockNode.css';

export class DefaultBlockNodeWidget extends DefaultNodeWidget {

  render() {
    const {node} = this.props;
    // TODO: Change text color according to background color
    return (
      <Card className="block" style={{backgroundColor: node.getColor()}}>
        <Card.Header>
          <PortWidget name="in" node={node}/>

          <div className="block-name">
            {node.name}
          </div>

          <PortWidget name="out" node={node}/>

          <div className="flags-container">
            {
              /* completed */
              node.isFinished() &&
              <i className="fas fa-check-circle"/>
            }


            {
              /* running */
              node.isRunning() &&
              <Spinner animation="grow" size="sm"/>
            }


            {
              /* runtime error */
              node.isFailed() &&
              <i className="fas fa-exclamation-circle error"/>

            }

            {
              /* invalid block parameters */
              !node.isValid() &&
              <i className="fas fa-exclamation-triangle error"/>
            }
          </div>
        </Card.Header>
      </Card>
    );
  }
}

