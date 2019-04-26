import {getJSON} from "./utils";
import {APP_URL} from "../config";


const DO_DESIGN_TEMPLATE_URL = `${APP_URL}/template-do`;

export const JSONtoDoDesignTemplate = ({id, data}) => ({
  id,
  ...data
});

export default {
  async getDoDesignTemplates() {
    const jsonList = await getJSON(DO_DESIGN_TEMPLATE_URL);
    return jsonList.map(JSONtoDoDesignTemplate);
  }
}
