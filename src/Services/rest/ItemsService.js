import {getJSON, postJSON, sendDelete} from "./utils";
import {API_URL} from "../../config";


const ITEMS_URL = `${API_URL}/items`;


function JSONtoItem(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  return json;
}
/*
function itemToJSON(job) {
  return job;
}
*/

export default {

  async importFromCsvUrl (project, csvUrl) {
    const json = {
      id_project: project.id,
      csv_url: csvUrl
    };
    return await postJSON(ITEMS_URL, json);
  },

  async getItemsOfProject(project) {
    const jsonList = await getJSON(`${ITEMS_URL}?projectId=${project.id}`);
    return jsonList.map(JSONtoItem);
  },

  /*
  async createItems(item) {
    const json = itemToJSON(item);
    return await postJSON(ITEMS_URL, json);
  },
*/

  async deleteItem(item) {
    return await sendDelete(`${ITEMS_URL}/${item.id}`);
  },

}
