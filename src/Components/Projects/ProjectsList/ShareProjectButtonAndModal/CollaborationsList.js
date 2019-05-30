import React, {Component} from "react";
import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";

import LoadingContainer from "../../../common/LoadingContainer";
import UsersService from "../../../../Services/rest/UsersService";
import LoadingButton from "../../../common/LoadingButton";
import ProjectCollaborationsService from "../../../../Services/rest/ProjectCollaborationsService";


export default ({collaborations, onCollaborationDeleted}) => (
  <div>
    <h4>Collaborations</h4>
    <ListGroup>
      {
        collaborations.length <= 0 &&
        <span>No collaborations</span>
      }
      {
        collaborations.length > 0 && collaborations.map(collaboration => (
          <Collaboration key={collaboration.id} {...collaboration} onCollaborationDeleted={onCollaborationDeleted}/>
        ))
      }
    </ListGroup>
  </div>
);

class Collaboration extends Component {

  state = {
    isFetching: false,
    user: null,

    isRemoving: false
  };

  componentDidMount = () => this.fetchUser();

  fetchUser = async () => {
    this.setState({isFetching: true});
    try {
      const user = await UsersService.getById(this.getUserId());
      this.setState({user});
    } catch (e) {
      console.log(e);
      // TODO: Handle error
    }
    this.setState({isFetching: false});
  };

  getUserId = () => this.props.userId;

  onRemoveUser = async () => {
    this.setState({isRemoving: true});
    try {
      const id = this.getCollaborationId();
      await ProjectCollaborationsService.deleteCollaboration(id);
      this.props.onCollaborationDeleted(id);
    } catch (e) {
      // TODO: Handle error
    }
    this.setState({isRemoving: false})
  };

  getCollaborationId = () => this.props.id;

  render() {
    const {isRemoving, isFetching, user} = this.state;
    const {email, imageUrl} = user || {};
    return (
      (
        <ListGroupItem className="collaborator-row">
          <LoadingContainer loading={isFetching}>
            <Row>
              <Col xs={2}>
                <img alt="user avatar" width="100%" src={imageUrl}/>
              </Col>
              <Col xs={7}>{email}</Col>
              <Col xs={3} className="action">
                <LoadingButton isLoading={isRemoving} onClick={this.onRemoveUser}
                               variant="danger">Remove</LoadingButton>
              </Col>
            </Row>
          </LoadingContainer>
        </ListGroupItem>
      )
    );
  }
}
