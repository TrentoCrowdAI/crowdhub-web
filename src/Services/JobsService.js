import {getJson, postJson} from "./utils";
import mockedJobs from "../mock-data/jobs";

const APP_URL = "http://localhost:4000";

export default {
  async getJobs () {
    return getJson(`${APP_URL}/jobs`);
  },

  async createJob (job) {
    return await postJson(`${APP_URL}/jobs`, {
      data: {
        ...job
      }
    });
  }

}
