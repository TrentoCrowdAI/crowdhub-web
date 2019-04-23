import React, {Component} from 'react';
import {Card} from "react-bootstrap";

export default class DraggableDesignBlockTypeList extends Component {
  state = {
    designBlocks: [
      {
        "type": "input_dynamic_text",
        "name": "Input dynamic text",
        "parameters": [
          {
            "name": "csvVariable",
            "displayName": "",
            "description": "",
            "default": "value",
            "type": "text",

          },
          {
            "name": "csvTitleVariable",
            "displayName": "",
            "description": "",
            "default": "value",
            "type": "text",

          },
          {
            "name": "highlightable",
            "displayName": "",
            "description": "",
            "default": false,
            "type": "boolean",

          },
          {
            "name": "question",
            "displayName": "",
            "description": "",
            "default": "value",
            "type": "text",
            "required": "highlightable"
          },
          {
            "name": "highlightedCsvVariable",
            "displayName": "",
            "description": "",
            "default": "value",
            "type": "text",
            "required": "highlightable"
          }
        ]
      },
      {
        "type": "aaa",
        "name": "AAA",
        "parameters": [

        ]
      }
    ]
  };

  render() {
    return (
      <div>
        <h5>Design blocks</h5>

        <div ref={this.props.componentsContainerRef}>
          {
            this.state.designBlocks.map(blockType => {
              return (
                <Card key={blockType.type} data-block-type={JSON.stringify(blockType)}>
                  <Card.Header>{blockType.name}</Card.Header>
                </Card>
              );
            })
          }
        </div>
      </div>
    );
  }
}
