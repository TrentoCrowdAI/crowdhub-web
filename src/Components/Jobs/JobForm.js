import React, {Component} from 'react';
import {Container, Col, Row, Form, InputGroup, Button, Alert} from "react-bootstrap";
import JobsService from "../../Services/JobsService";
import {withRouter} from "react-router-dom";

class UnwrappedJobForm extends Component {

  constructor(props, context) {
    super(props);

    this.state = {
      isCreatingJob: false
    };
    this.context = context;
  }

  handleChange = (e) => {
    // TODO: Consider the advantages to use a form library

    const target = e.target;
    const key = target.name;
    let value = target.value;

    if (target.type === 'number') {
      if (value.step === '1') {
        value = parseInt(value);
      } else {
        value = parseFloat(value);
      }
    }

    this.setState({
      [key]: value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.createJob();
  };

  async createJob() {
    try {
      this.setState({isCreatingJob: true});
      await JobsService.createJob({
        name: this.state.name,
        description: this.state.description,
        num_votes: this.state.num_votes,
        max_votes: this.state.max_votes,
        reward: this.state.reward,
      });
      this.onJobCreated();
    } catch (e) {
      this.onJobCreationFailed();
    }
  }

  onJobCreated() {
    this.setState({isCreatingJob: false});
    this.redirectToJobsList();
  }

  redirectToJobsList() {
    this.props.history.push('/jobs');
  }

  onJobCreationFailed() {
    this.setState({isCreatingJob: false, jobCreationFailed: true});
  }

  render() {
    return (
      <Container>
        {
          !this.state.isCreatingJob && this.state.jobCreationFailed &&
          <JobCreationFailed/>
        }

        <Form onSubmit={this.handleSubmit} disabled={this.isCreatingJob}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Job name</Form.Label>
                <Form.Control name="name" type="text" value={this.name}
                              onChange={this.handleChange} required
                              placeholder="Ex: classify category of papers"/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Job description</Form.Label>
                <Form.Control name="description" value={this.description} as="textarea" rows="3"
                              onChange={this.handleChange} required/>
              </Form.Group>
            </Col>
          </Row>


          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Path to CSV file</Form.Label>
                <Form.Control name="items_csv" type="text" value={this.items_csv}
                              onChange={this.handleChange} required
                              placeholder="Ex: https://raw.githubusercontent.com/TrentoCrowdAI/servant-api/develop/src/example/papers-short.csv"/>
              </Form.Group>
            </Col>
          </Row>


          <Row>
            <Col xs="12" sm="6">
              <Form.Group>
                <Form.Label>Votes for item</Form.Label>
                <Form.Control type="number" name="num_votes" value={this.num_votes} onChange={this.handleChange}
                              required/>
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group>
                <Form.Label>Max votes per worker</Form.Label>
                <Form.Control type="number" step="1" name="max_votes" value={this.max_votes} onChange={this.handleChange}
                              required/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs="12" sm="6">
              <Form.Group>
                <Form.Label>Reward</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="number" step="0.01" name="reward" value={this.reward} onChange={this.handleChange}
                                required/>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="d-flex flex-row-reverse">
                <Button variant="primary" type="submit" id="submit-create-job">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>

        </Form>
      </Container>
    )
  }
}

// Wrap using withRouter to obtaint the history object in the props
export const JobForm = withRouter(UnwrappedJobForm);

export const JobCreationFailed = () => (
  <Col>
    <Alert variant="danger">
      There's been an error while creating the job
    </Alert>
  </Col>
);
