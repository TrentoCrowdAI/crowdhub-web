import {getJSON, postJSON, sendDelete, putJSON} from "./utils";

export const APP_URL = "http://localhost:4000";

function JSONtoJob(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  json.data.max_votes = json.data.maxVotes;
  json.data.num_votes = json.data.numVotes;

  delete json.data.maxVotes;
  delete json.data.numVotes;

  json.data.design = {
    html: json.data.design.markup,
    js: json.data.design.javascript,
    css: json.data.design.css
  };

  return json;
}

function jobToJSON(job) {
  job.data.maxVotes = job.data.max_votes;
  job.data.numVotes = job.data.num_votes;

  delete job.data.max_votes;
  delete job.data.num_votes;

  job.data.design = {
    markup: job.data.design.html,
    javascript: job.data.design.js,
    css: job.data.design.css
  };

  return job;
}

export default {
  async getJobs() {
    const jsonList = await getJSON(`${APP_URL}/jobs`)
    return jsonList.map(JSONtoJob);
  },

  async getJob(id) {
    const jsonJob = await getJSON(`${APP_URL}/jobs/${id}`);
    return JSONtoJob(jsonJob);
  },

  async createJob(job) {
    const json = jobToJSON(job);
    return await postJSON(`${APP_URL}/jobs`, json);
  },

  async updateJob(job) {
    const json = jobToJSON(job);
    return await putJSON(`${APP_URL}/jobs/${job.id}`, json);
  },

  async deleteJob(job) {
    return await sendDelete(`${APP_URL}/jobs/${job.id}`);
  },

  async publish(job, platform) {
    const jsonJob = await postJSON(`${APP_URL}/jobs/${job.id}/publish`, {platform});
    return JSONtoJob(jsonJob);
  }

}
