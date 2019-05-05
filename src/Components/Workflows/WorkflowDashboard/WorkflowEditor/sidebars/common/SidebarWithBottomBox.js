import React from "react";
import {Col, Row} from "react-bootstrap";

import "./SidebarWithBottomBox.css";

export default ({title, center, bottom}) => (
  <div className="sidebar-column">
    <div className="title-and-center-container">
      <Row>
        <Col>
          <h5>{title}</h5>
        </Col>
      </Row>

      {center}
    </div>

    <div className="bottom-container">
      <hr/>
      {bottom}
    </div>
  </div>
);
