import {getJSON, postJson, sendDelete} from "./utils";

export const APP_URL = "http://localhost:4000";

export default {
  async getJobs () {
    return await getJSON(`${APP_URL}/jobs`);
  },

  async getJob (id) {
    return await getJSON(`${APP_URL}/jobs/${id}`);
  },

  async createJob (job) {
    return await postJson(`${APP_URL}/jobs`, {
      data: {
        ...job
      }
    });
  },

  async deleteJob (job) {
    return await sendDelete(`${APP_URL}/jobs/${job.id}`);
  }

}
