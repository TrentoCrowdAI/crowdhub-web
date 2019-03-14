import {fetchJson} from "./utils";
import mockedJobs from "../mock-data/jobs";


export default {
  async getJobs () {
    return mockedJobs;
    //return fetchJson('/jobs');
  }
}
