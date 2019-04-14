import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {APP_URL} from "../config";


const ITEMS_URL = `${APP_URL}/items`;

function JSONtoItem(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  return json;
}

function itemToJSON(job) {
  return job;
}

export default {

  async importFromCsvUrl (project, csvUrl) {
    const json = {
      id_project: project.id,
      csv_url: csvUrl
    };
    return await postJSON(ITEMS_URL, json);
  },

  async getItems() {
    const jsonList = await getJSON(ITEMS_URL);
    return jsonList.map(JSONtoItem);
  },

  async createItems(item) {
    const json = itemToJSON(item);
    return await postJSON(ITEMS_URL, json);
  },


  async deleteItem(item) {
    return await sendDelete(`${ITEMS_URL}/${item.id}`);
  },

}
