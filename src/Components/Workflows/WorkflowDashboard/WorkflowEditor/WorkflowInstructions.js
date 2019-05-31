import React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

import "./WorkflowInstructions.css";

export default () => (
  <OverlayTrigger
    placement="bottom"
    overlay={
      <Tooltip >
        To remove a link hold <strong>shift</strong> and click the link with the right mouse button.
      </Tooltip>
    }
  >
    <Button className="instructions-trigger"  variant="secondary"><i className="far fa-question-circle"/></Button>
  </OverlayTrigger>
);
