import React, {Component} from "react";
import {Button, Col, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import UsersService, {USER_SUGGETION_MIN_EMAIL_LENGTH} from "../../../../Services/rest/UsersService";
import LoadingContainer from "../../../common/LoadingContainer";
import ProjectCollaborationsService from "../../../../Services/rest/ProjectCollaborationsService";
import LoadingButton from "../../../common/LoadingButton";

export default class AddNewCollaboration extends Component {

  state = {};

  fetchSuggestions = async (input) => {
    if (input.length >= USER_SUGGETION_MIN_EMAIL_LENGTH) {
      return await this.fetchSuggestionsFromService(input);
    }
    return [];
  };

  fetchSuggestionsFromService = async (input) => {
    const users = await UsersService.findUsersByEmail(input);
    return this.filterUserAlreadyCollaborating(users);
  };

  filterUserAlreadyCollaborating = (users) => {
    const collaboratorIds = this.getUserIdsOfCollaborators();
    return users
      .filter(user => this.props.project.ownerId !== user.id)
      .filter(user => collaboratorIds.find(collaboratorId => collaboratorId === user.id) == null);
  };

  getUserIdsOfCollaborators = () => this.getCollaborations().map(collaboration => collaboration.userId);

  getCollaborations = () => this.props.collaborations;

  render() {
    const {project} = this.props;
    return (
      <div>
        <h4>Add a new collaboration</h4>
        <Form.Group>
          <Form.Label>User email</Form.Label>
          <AutocompleteField
            fetchSuggestions={this.fetchSuggestions}
            renderSuggestion={user => <SuggestedUser key={user.id}
                                                     {...user}
                                                     projectId={project.id}
                                                     onCollaborationAdded={this.props.onCollaborationAdded}/>}
            onSuggestionSelected={this.onAddUser}
          />
        </Form.Group>
      </div>
    );
  }
}

class SuggestedUser extends Component {

  state = {
    isAdding: false,
    added: false
  };

  onAddUser = async () => {
    const {projectId, id: userId} = this.props;
    this.setState({isAdding: true});
    try {
      const collaboration = await ProjectCollaborationsService.createCollaboration(projectId, userId);
      this.props.onCollaborationAdded(collaboration);
      this.setState({added: true});
    } catch (e) {
      // TODO: Handle error
    }
    this.setState({isAdding: false});
  };

  render() {
    const {isAdding, added} = this.state;
    const {email, imageUrl} = this.props;
    return (
      <ListGroupItem className="collaborator-row">
        <Row>
          <Col xs={2}>
            <img alt="user avatar" className="user-avatar" src={imageUrl}/>
          </Col>
          <Col xs={7}>{email}</Col>
          <Col xs={3} className="action">
            {
              added ?
                <Button className="btn-block" disabled variant="success">Added</Button> :
                <LoadingButton block isLoading={isAdding} onClick={this.onAddUser}>Add</LoadingButton>
            }
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

class AutocompleteField extends Component {

  DEFAULT_TIMEOUT = 300;

  timeout = null;

  state = {
    suggestions: [],
    isFetching: false,

    value: '',
  };

  onInputChange = (input) => {
    this.setState({value: input});
    if (this.isTimeoutRunning()) {
      this.cancelTimeout();
    }
    this.startTimeout(input);
  };

  isTimeoutRunning = () => this.timeout !== null;

  cancelTimeout = () => {
    clearTimeout(this.timeout);
    this.timeout = null;
  };

  startTimeout = (input) => this.timeout = setTimeout(
    () => this.onTimeoutElapsed(input),
    this.DEFAULT_TIMEOUT
  );

  onTimeoutElapsed = async (input) => {
    this.setState({isFetching: true});
    try {
      const suggestions = await this.props.fetchSuggestions(input);
      this.setState({suggestions, isFetching: false});
    } catch (e) {
      console.error(e);
    }
  };

  onSuggestionSelected = (suggestion) => {
    if (this.isTimeoutRunning()) {
      this.cancelTimeout();
    }
    this.setState({
      value: '',
      suggestions: [],
      isFetching: false
    });
    this.props.onSuggestionSelected(suggestion);
  };

  render() {
    const {value, suggestions, isFetching, fetchError} = this.state;
    const {renderSuggestion} = this.props;
    return (
      <div>
        <Form.Control
          className="mb-2"
          value={value}
          onChange={(e) => this.onInputChange(e.target.value)}/>


        <LoadingContainer loading={isFetching}>
          {
            fetchError &&
            <span>Can't suggest users</span>
          }

          <ListGroup>
            {
              !fetchError &&
              suggestions.map(renderSuggestion)
            }
          </ListGroup>
        </LoadingContainer>
      </div>
    );
  }
}

