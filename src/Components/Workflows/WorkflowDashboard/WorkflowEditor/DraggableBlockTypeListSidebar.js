import React from 'react';
import {Card, Col, Row} from "react-bootstrap";


const DraggableBlockTypeListSidebar = ({blockTypes}) => (
  <div>
    <h5>Workflow blocks</h5>

    <Row>
      <Col>
        {
          blockTypes.map(blockType => (
            <Card
              key={blockType.id}
              className="btn-block"
              style={{backgroundColor: blockType.data.color}}
              draggable
              onDragStart={event => event.dataTransfer.setData('blockType', JSON.stringify(blockType))}>
              <Card.Header>
                {blockType.data.name}
              </Card.Header>
            </Card>
          ))
        }
      </Col>
    </Row>
  </div>
);

export default DraggableBlockTypeListSidebar;
