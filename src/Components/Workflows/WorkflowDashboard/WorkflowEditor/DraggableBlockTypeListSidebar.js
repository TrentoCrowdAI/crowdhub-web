import React from 'react';
import {Card, Col, Row} from "react-bootstrap";


const DraggableBlockTypeListSidebar = ({blockTypeDefinitions}) => (
  <div>
    <h5>Workflow blocks</h5>

    <Row>
      <Col>
        {
          blockTypeDefinitions.map(blockTypeDefinitions => (
            <Card
              key={blockTypeDefinitions.id}
              className="btn-block"
              style={{backgroundColor: blockTypeDefinitions.color}}
              draggable
              onDragStart={event => event.dataTransfer.setData('blockTypeDefinition', JSON.stringify(blockTypeDefinitions))}>
              <Card.Header>
                {blockTypeDefinitions.displayName}
              </Card.Header>
            </Card>
          ))
        }
      </Col>
    </Row>
  </div>
);

export default DraggableBlockTypeListSidebar;
