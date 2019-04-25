import React, {Component} from 'react';
import {Alert, Button, Card, Col, Container, Modal, Row} from 'react-bootstrap';

import DoDesignTemplatesService from "../../../../../../../Services/DoDesignTemplatesService";
import {makeCancellable} from "../../../../../../../Services/utils";
import {DesignBlocksModel} from "./DesignBlocksModel";

export class PickDesignTemplateModalAndButton extends Component {

  state = {
    show: false
  };

  onShow = () => this.setState({show: true});

  onHide = () => this.setState({show: false});

  onTemplatePicked = (blocksModel) => {
    this.onHide();
    setTimeout(() => {
      this.props.designModel.setBlocksModel(blocksModel);
      this.props.onModelUpdated();
    }, 200); // TODO: Refactor
  };

  render() {
    return (
      <div>
        <PickDesignTemplateModal show={this.state.show} onHide={this.onHide} onTemplatePicked={this.onTemplatePicked}/>

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

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} size="lg">
        <Modal.Header>Pick a design template</Modal.Header>

        <Modal.Header>
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
            <TemplateList templates={this.state.templates} onTemplatePicked={this.props.onTemplatePicked}/>
          }
        </Modal.Header>

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
        templates.map(template => {
          // TODO: Refactor
          try {
            const blocksModel = new DesignBlocksModel(template.data);

            return (
              <Col xs={12} sm={6} key={template.id}>
                <Card>
                  <Card.Header>{template.data.name}</Card.Header>
                  <Card.Body>{template.data.description}</Card.Body>
                  <Card.Footer>
                    <Button onClick={() => onTemplatePicked(blocksModel)}>Choose</Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          } catch (e) {
            return (
              <div key={template.id}>Error: can't parse template</div>
            )
          }
        })
      }
    </Row>
  </Container>
);
