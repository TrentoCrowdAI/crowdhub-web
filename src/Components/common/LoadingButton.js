import {Button, Spinner} from "react-bootstrap";
import React from "react";

const LoadingButton = ({isSaving, disabled, onClick, children, block}) => (
  <Button disabled={disabled || isSaving} onClick={onClick} className={block ? 'btn-block' : ''}>
    {
      isSaving &&
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
