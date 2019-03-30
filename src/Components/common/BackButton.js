import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

import "./BackButton.css";

export default ({to, text}) => (
  <Row>
    <Col>
      <Link to={to} className="btn btn-outline-primary back-button">
        <i className="fas fa-arrow-left"/> {text}
      </Link>
    </Col>
  </Row>
);
