import {Spinner} from "react-bootstrap";
import React from "react";

const LoadingContainer = ({loading, children}) => {
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <Spinner animation="border" variant="primary"/>
      </div>
    );
  }
  return children;
};


export default LoadingContainer;
