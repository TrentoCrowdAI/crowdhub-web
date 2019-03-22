import React, {Component} from 'react';
import {Card} from "react-bootstrap";

import './BlocksColumn.css'

export default class BlocksColumn extends Component {

  handleBlockDataChange = (index) => (data) => {
    const blocks = this.props.blocksList;
    blocks[index] = data;
    this.props.onChange(blocks);
  };

  render() {
    return (
      <Card border="primary">
        <Card.Header>{this.props.title}</Card.Header>
        <Card.Body>
          <div className="blocks-container" ref={this.props.componentsContainerRef}>
            {
              this.props.blocksList.map((data, index) => {
                const definition = this.props.blockDefinitionsMap[data.type];
                const key = data.id || index;

                if (definition) {
                  const Component = definition.Component;
                  return <Component key={key} data={data} onChange={this.handleBlockDataChange(index)}/>
                } else {
                  return <ComponentNotFoundError key={key} type={data.type}/>
                }
              })
            }
          </div>
        </Card.Body>
      </Card>
    );
  }
}

const ComponentNotFoundError = ({type}) => <p>Can't render component of type {type}</p>;
