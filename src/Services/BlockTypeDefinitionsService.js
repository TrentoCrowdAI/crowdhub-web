import {getJSON} from "./utils";
import {APP_URL} from "../config";


const BLOCK_TYPES_URL = `${APP_URL}/block-types`;


const JSONtoBlockTypeDefinition = ({id, data}) => ({
  id,
  name: data.name,
  displayName: data.displayName,
  ports: data.ports,
  color: data.color,
  parameterDefinitions: data.parameterDefinitions
});

export default {
  async getBlockTypeDefinitions() {
    const jsonList = await getJSON(BLOCK_TYPES_URL);
    return jsonList.map(JSONtoBlockTypeDefinition);
  }
}
