import React from "react";
import {Col, Row} from "react-bootstrap";

import "./SidebarWithTitle.css";

export default ({title, center}) => (
  <div className="sidebar-column">
    <div className="title-and-center-container">
      <Row>
        <Col>
          <h5>{title}</h5>
        </Col>
      </Row>

      {center}
    </div>
  </div>
);
