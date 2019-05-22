import React, {Component} from 'react';
import {Button, OverlayTrigger, Popover} from "react-bootstrap";

import userAvatar from "../../images/user-avatar.svg";
import "./AccountInformation.css";
import {makeCancellable} from "../../Services/rest/utils";
import AccountBalanceService from "../../Services/rest/AccountBalanceService";
import LoadingContainer from "../common/LoadingContainer";

export default class AccountInformation extends Component {
  render() {
    return (
      <OverlayTrigger
        placement="bottom"
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
    return (
      <div>
        <span>User name</span>
        <img className="user-avatar" src={userAvatar} alt="user avatar"/>
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
  render() {
    return (
      <Button className="btn-block">Logout</Button>
    );
  }
}
