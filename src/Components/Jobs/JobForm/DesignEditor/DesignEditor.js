import React, {Component} from 'react';
import Dragula from 'dragula';
import "./DesignEditor.css";
import "dragula/dist/dragula.css";
import OutputDynamicText from "./blocks/OutputDynamicText";
import InputOpenQuestion from "./blocks/InputOpenQuestion";
import {Container, Row, Col, Card} from "react-bootstrap";

export default class DesignEditor extends Component {

  state = {
    blocks: []
  };

  constructor(props) {
    super(props);
    this.toolsRef = React.createRef();
    this.designRef = React.createRef();
  }

  componentDidMount() {
    this.initDracula();
  }

  initDracula = () => {
    const containers = [
      this.toolsRef.current,
      this.designRef.current
    ];

    const drake = Dragula(containers, {
      copy: true
    });


    drake.on('drop', (el, target, source, sibling) => {
      if (source.classList.contains('tools')) {
        this.setState(old => {
          return {
            blocks: [...old.blocks, {
              type: el.getAttribute('data-type')
            }]
          }
        });
        el.parentNode.removeChild(el);
      } else {
        console.log(sibling);
      }

    })
  };

  DOMToJSON = () => {
    const container = this.designRef.current;
    const items = [];
    for (let i = 0; i < container.children.length; i++) {
      const element = container.children[i];
      items.push({
        type: element.getAttribute('data-type'),
        csvVariable: element.getAttribute('data-csv-variable')
      });
    }

    return items;
  };

  render() {
    return (
      <div>
        <Row>
          <Col md="6" lg="4">
            <Card border="primary">
              <Card.Header>Available blocks</Card.Header>
              <Card.Body>
                <div className="tools blocks-container" ref={this.toolsRef}>
                  <div data-type="output_dynamic_text">
                    <OutputDynamicText expanded={false}/>
                  </div>

                  <div data-type="aaaa">
                    <InputOpenQuestion expanded={false}/>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" lg="8">
            <Card border="primary">
              <Card.Header>Job layout</Card.Header>
              <Card.Body>
                <div className="design blocks-container" ref={this.designRef}>
                  {
                    this.state.blocks.map((b) => {
                      console.log(b)
                      if (b.type === 'output_dynamic_text') {
                        return <OutputDynamicText key={Math.random()} expanded={true}/>
                      } else {
                        return <InputOpenQuestion key={Math.random()} expanded={true}/>
                      }
                    })
                  }
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <button onClick={(e) => {
          e.preventDefault();
          console.log(this.DOMToJSON());

        }}>Print JSON
        </button>
      </div>
    );
  }
}


