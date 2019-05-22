import React from "react";
import {mount} from "enzyme";

import {AccountInformationPopoverContent, PlatformBalances} from "./AccountInformation";
import AccountBalanceService from "../../Services/rest/AccountBalanceService";
import {expectComponent, expectIsLoading} from "../../testHelpers/components";
import mockedAccountBalances from '../../mock-data/account-balances';


describe('should show the balances of the account', () => {

  const mockGetBlances = (balances = mockedAccountBalances) => {
    const getBalances = jest.fn(() => new Promise((resolve) => resolve(balances)));
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

  const mountAndWaitForRequestToBalances = async () => {
    const wrapper = await mount(<AccountInformationPopoverContent/>);
    await wrapper.update();
    await wrapper.update();
    return wrapper;
  };

  it('shows the balance after loading', async () => {
    // given
    const getBalances = mockGetBlances();

    // when
    const wrapper = await mountAndWaitForRequestToBalances();

    // then
    expect(getBalances).toHaveBeenCalled();
    expectComponent(wrapper, PlatformBalances);
  });

  it("shows 'not available' on one balance if that balance is not available", async () => {
    // given
    mockGetBlances({
      ...mockedAccountBalances,
      f8: 'not available'
    });

    // when
    const wrapper = await mountAndWaitForRequestToBalances();

    // then
    expect(wrapper.html()).toContain("not available");
  });

});
