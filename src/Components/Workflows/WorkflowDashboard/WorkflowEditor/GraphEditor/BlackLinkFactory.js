import React from 'react';
import {DefaultLinkFactory} from "storm-react-diagrams";

export default class BlackLinkFactory extends DefaultLinkFactory {

  generateLinkSegment(model, widget, selected, path) {
    return (
      <path
        className={selected ? widget.bem("--path-selected") : ""}
        strokeWidth={model.width}
        stroke="black"
        d={path}
      />
    );
  }
}
