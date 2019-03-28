import React, {Component} from "react";
import {Card, Collapse} from "react-bootstrap";
import './BlockCard.css';


export default class BlockCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded
    };
  }

  toggleExpansion = () => this.setState(
    (previousState) => {
      return {expanded: !previousState.expanded}
    },
    () => this.props.onToggleExpansion(this.state.expanded)
  );

  render() {
    return (
      <Card className="block-card" data-block-type={this.props.type} data-block-id={this.props.id}>
        <Card.Header>
          {
            this.props.expandable &&
            <a onClick={this.toggleExpansion}>
              {
                /* Hacky: show the warning icon only if card is expandable */
                this.props.valid === false &&
                <i className="fas fa-exclamation-triangle"/>
              }

              {this.props.title}

              <i className={`fas fa-caret-down ${this.state.expanded ? 'expanded' : 'collapsed'}`}/>
            </a>
          }
          {!this.props.expandable && this.props.title}

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
