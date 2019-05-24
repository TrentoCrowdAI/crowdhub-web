import {Button, Spinner} from "react-bootstrap";
import React from "react";

const LoadingButton = ({isLoading, disabled, onClick, children, block}) => (
  <Button disabled={disabled || isLoading} onClick={onClick} className={block ? 'btn-block' : ''}>
    {
      isLoading &&
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    }
    <span> {children}</span>
  </Button>
);

export default LoadingButton;
