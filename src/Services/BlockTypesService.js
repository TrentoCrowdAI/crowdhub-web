import {getJSON} from "./utils";
import {APP_URL} from "../config";


const BLOCK_TYPES_URL = `${APP_URL}/block-types`;

const JSONtoBlockType = (json) => {
  json.data.blockType = json.data.type;
  json.data.type = json.data.nodeType;

  return json;
};

export default {
  async getBlockTypes() {
    const jsonList = await getJSON(BLOCK_TYPES_URL);
    return jsonList.map(JSONtoBlockType);
  }
}
