import React, {Component} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import "./AccountInformation.css";
import {makeCancellable} from "../../Services/rest/utils";
import AccountBalanceService from "../../Services/rest/AccountBalanceService";
import LoadingContainer from "../common/LoadingContainer";
import AuthService from "../../Services/AuthService";
import LoadingButton from "../common/LoadingButton";
import {LOGIN_PATH} from "../Login/Login";
import {Redirect} from "react-router-dom";

export default class AccountInformation extends Component {
  render() {
    return (
      <OverlayTrigger
        placement="bottom"
        trigger="click"
        overlay={
          <Popover id="account-information-popover"
                   title="Account information">
            <AccountInformationPopoverContent/>
          </Popover>
        }>

        <div>
          <AccountInformationPreview/>
        </div>
      </OverlayTrigger>
    );
  }
}

class AccountInformationPreview extends Component {
  render() {
    const userInfo = AuthService.getUserInfo();
    return (
      <div>
        <span>{userInfo.getName()}</span>
        <img className="user-avatar" src={userInfo.getImageUrl()} alt="user avatar"/>
      </div>
    );
  }
}


export class AccountInformationPopoverContent extends Component {
  render() {
    return (
      <div>
        <PlatformBalances/>

        <hr/>

        <LogoutButton/>
      </div>
    );
  }
}


export class PlatformBalances extends Component {

  pendingBalancesRequest;

  state = {
    balances: null,
    fetchError: false
  };

  componentDidMount = async () => await this.fetchBalances();

  componentWillUnmount = () => this.pendingBalancesRequest.cancel();

  fetchBalances = async () => {
    this.setState({balances: null, fetchError: false});
    try {
      this.pendingBalancesRequest = makeCancellable(AccountBalanceService.getBalances());
      const balances = await this.pendingBalancesRequest.result;
      this.setState({balances, fetchError: false});
    } catch (e) {
      this.setState({balances: null, fetchError: true});
    }
  };

  render() {
    return (
      <div className="balances-container">
        <h6>Balances</h6>

        <LoadingContainer loading={!this.state.balances && !this.state.fetchError}>
          {
            !this.state.balances && this.state.fetchError &&
            <p>Error</p>
          }

          {
            this.state.balances && !this.state.fetchError &&
            this.renderBalances()
          }
        </LoadingContainer>
      </div>
    );
  }

  static prepareNumber = (balance) => typeof balance === "number" ? balance.toFixed(2) : "not available";

  renderBalances = () => {
    const {tolokaSandbox, tolokaNormal, f8} = this.state.balances;
    return (
      <div>
        <strong>Toloka Sandbox</strong>: {PlatformBalances.prepareNumber(tolokaSandbox)}$<br/>
        <strong>Toloka</strong>: {PlatformBalances.prepareNumber(tolokaNormal)}$<br/>
        <strong>Toloka</strong>: {PlatformBalances.prepareNumber(f8)}$<br/>
      </div>
    );
  };

}


class LogoutButton extends Component {

  state = {
    loggingOut: false,
    loggedOut: false
  };

  onLogout = async () => {
    this.setState({loggingOut: true});
    try {
      await AuthService.signOut();
      this.setState({loggedOut: true});
    } catch (e) {
      console.error(e);
      // TODO: Handle error
    }
    this.setState({loggingOut: false});
  };

  render() {
    if (this.state.loggedOut) {
      return this.renderRedirect();
    }
    return (
      <LoadingButton isSaving={this.state.loggingOut} onClick={this.onLogout} block>Logout</LoadingButton>
    );
  }

  renderRedirect = () => (
    <Redirect to={LOGIN_PATH}/>
  );
}
