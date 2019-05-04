import {APP_URL} from "../../config";


const CACHE_URL = `${APP_URL}/cache`;

export default {

  getDownloadLink(cacheId) {
    return `${CACHE_URL}/${cacheId}?format=csv`;
  }

}
