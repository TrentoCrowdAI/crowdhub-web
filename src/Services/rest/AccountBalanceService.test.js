import {mockFetchToReturnJson} from "../../testHelpers/services";
import mockedAccountBalances from '../../mock-data/account-balances';
import AccountBalanceService from "./AccountBalanceService";


describe('test getBalances', () => {
  it('sends a GET to /account-balance',  async () => {
    mockFetchToReturnJson(mockedAccountBalances);

    const balances = await AccountBalanceService.getBalances();

    expect(balances).toEqual(mockedAccountBalances);
  });
});
