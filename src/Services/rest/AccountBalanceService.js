import {getJSON} from "./utils";
import {API_URL} from "../../config";


const ACCOUNT_BALANCE_URL = `${API_URL}/account-balance`;


export const JSONtoBalances = json => json;

export default {

  _cachedBalance: null,

  async getBalances() { // TODO: This method is doing too much: split caching and request
    if(this._cachedBalance) {
      return this._cachedBalance;
    }
    const json = await getJSON(ACCOUNT_BALANCE_URL);
    this._cachedBalance = JSONtoBalances(json);
    return this._cachedBalance;
  }
}
