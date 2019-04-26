import {Button, Spinner} from "react-bootstrap";
import React from "react";

const LoadingButton = ({isSaving, disabled, text, onClick}) => (
  <Button disabled={disabled} onClick={onClick}>
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
    <span> {text}</span>
  </Button>
);

export default LoadingButton;
