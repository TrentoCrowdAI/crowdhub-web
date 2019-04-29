import React, {Component} from 'react';
import {Alert, Button, Card, Col, Container, Modal, Row} from 'react-bootstrap';

import DoDesignTemplatesService from "../../../../../../../Services/DoDesignTemplatesService";
import {makeCancellable} from "../../../../../../../Services/utils";
import {DesignBlocksModel} from "./DesignBlocksModel";

const HIDE_ANIMATION_DURATION = 150;

export class PickDesignTemplateModalAndButton extends Component {

  state = {
    show: false
  };

  onShow = () => this.setState({show: true});

  onHide = (afterHided) => this.setState({show: false}, () => setTimeout(afterHided, HIDE_ANIMATION_DURATION));

  onDesignBlocksModelPicked = (blocksModel) => this.onHide(() => {
    this.getDesignModel().setBlocksModel(blocksModel);
    this.props.onModelUpdated()
  });


  getDesignBlockTypeDefinitions() {
    return this.getDesignModel().getBlocksModel().getDesignBlockTypeDefinitions();
  }

  getDesignModel() {
    return this.props.designModel;
  }

  render() {
    return (
      <div>
        <PickDesignTemplateModal show={this.state.show}
                                 onHide={this.onHide}
                                 onDesignBlocksModelPicked={this.onDesignBlocksModelPicked}
                                 designBlockTypeDefinitions={this.getDesignBlockTypeDefinitions()}/>

        <Button variant="success" onClick={this.onShow} className="btn-block mb-2">Create from a template</Button>
      </div>
    )
  }
}

export class PickDesignTemplateModal extends Component {

  state = {
    templates: null,
    fetchError: false
  };

  componentDidMount = () => this.fetchTemplates();

  componentWillUnmount = () => this.pendingTemplatesRequest.cancel();

  fetchTemplates = async () => {
    this.setState({fetchError: false});
    try {
      this.pendingTemplatesRequest = makeCancellable(DoDesignTemplatesService.getDoDesignTemplates());
      const templates = await this.pendingTemplatesRequest.result;
      this.setState({templates});
    } catch (e) {
      this.setState({fetchError: true});
    }
  };

  onTemplatePicked = (template) => {
    const blocksModel = new DesignBlocksModel(this.props.designBlockTypeDefinitions, template.blocks);
    this.props.onDesignBlocksModelPicked(blocksModel);
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} size="lg">
        <Modal.Header>Pick a design template</Modal.Header>

        <Modal.Body>
          {
            this.state.fetchError &&
            <FetchTemplatesError/>
          }

          {
            !this.state.templates && !this.state.fetchError &&
            <FetchingTemplates/>
          }

          {
            this.state.templates &&
            <TemplateList templates={this.state.templates} onTemplatePicked={this.onTemplatePicked}/>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const FetchTemplatesError = () => (
  <Alert variant="danger">
    There's been an error while fetching the templates
  </Alert>
);

const FetchingTemplates = () => (
  <p>Loading...</p>
);

const TemplateList = ({templates, onTemplatePicked}) => (
  <Container>
    <Row>
      {
        templates.map(template => (
          <Col xs={12} sm={6} key={template.id} className="mb-2">
            <Card>
              <Card.Header>{template.name}</Card.Header>
              <Card.Body>{template.description}</Card.Body>
              <Card.Footer>
                <Button onClick={() => onTemplatePicked(template)}>Choose</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))
      }
    </Row>
  </Container>
);
