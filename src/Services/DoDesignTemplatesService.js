import {getJSON} from "./utils";
import {APP_URL} from "../config";


const DO_DESIGN_TEMPLATE_URL = `${APP_URL}/template-do`;

const JSONtoDoDesignTemplate = (json) => {
  return json;
};

export default {
  async getDoDesignTemplates() {
    const jsonList = await getJSON(DO_DESIGN_TEMPLATE_URL);
    return jsonList.map(JSONtoDoDesignTemplate);
  }
}
