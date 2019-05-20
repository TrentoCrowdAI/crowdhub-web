import {getJSON} from "./utils";
import {API_URL} from "../../config";


const ACCOUNT_BALANCE_URL = `${API_URL}/account-balance`;


export const JSONtoBalances = json => json;

export default {

  _cachedBalance: null,

  async getBalances() {
    if (this._isBalancesCached()) {
      return this._getCachedBalance();
    }
    const json = await getJSON(ACCOUNT_BALANCE_URL);
    const balances = JSONtoBalances(json);
    this._cacheBalances(balances);
    return balances;
  },

  _isBalancesCached() {
    return !!this._getCachedBalance();
  },

  _getCachedBalance() {
    return this._cachedBalance;
  },

  _cacheBalances(balances) {
    this._cachedBalance = balances;
  }
}

