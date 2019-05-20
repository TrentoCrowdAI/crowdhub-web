import React from "react";
import {mount} from "enzyme";

import {AccountInformationPopoverContent, PlatformBalances} from "./AccountInformation";
import AccountBalanceService from "../../Services/rest/AccountBalanceService";
import {expectComponent, expectIsLoading} from "../../testHelpers/components";
import mockedAccountBalances from '../../mock-data/account-balances';


describe('should show the balances of the account', () => {

  const mockGetBlances = () => {
    const getBalances = jest.fn(() => new Promise((resolve) => resolve(mockedAccountBalances)));
    AccountBalanceService.getBalances = getBalances;
    return getBalances;
  };

  it('shows a loading message while loading', () => {
    // given
    const getBalances = mockGetBlances();

    // when
    const wrapper = mount(<AccountInformationPopoverContent/>);

    // then
    expect(getBalances).toHaveBeenCalled();
    expectIsLoading(wrapper);
  });

  it('shows the balance after loading', () => {
    // given
    const getBalances = mockGetBlances();

    // when
    const wrapper = mount(<AccountInformationPopoverContent/>);
    wrapper.update();

    // then
    expect(getBalances).toHaveBeenCalled();
    expectComponent(wrapper, PlatformBalances);
  });

});
