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
              className="mb-2"
              key={blockTypeDefinitions.id}
              draggable
              onDragStart={event => event.dataTransfer.setData('blockTypeDefinition', JSON.stringify(blockTypeDefinitions))}>
              <Card.Header className="btn-block d-flex justify-content-center">
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
