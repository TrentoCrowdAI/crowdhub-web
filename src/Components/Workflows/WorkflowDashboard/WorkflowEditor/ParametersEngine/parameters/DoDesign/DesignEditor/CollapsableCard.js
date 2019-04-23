import React, {Component} from "react";
import {Card, Collapse} from "react-bootstrap";
import './CollapsableCard.css';


export default class CollapsableCard extends Component {

  state = {
    expanded: false
  };

  toggleExpansion = () => this.setState((state) => ({expanded: !state.expanded}));

  render() {
    return (
      <Card className="block-card">
        <Card.Header>
          <div onClick={this.toggleExpansion}>
            <div>
              {
                this.props.invalid &&
                <i className="fas fa-exclamation-triangle"/>
              }

              {this.props.title}
            </div>

            <i className={`fas fa-caret-down ${this.state.expanded ? 'expanded' : 'collapsed'}`}/>
          </div>
        </Card.Header>
        <Collapse in={this.state.expanded}>
          <div>
            <Card.Body>
              {this.props.children}
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    );
  }
}
