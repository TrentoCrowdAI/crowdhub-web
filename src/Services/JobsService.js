import {getJSON, postJSON, sendDelete, putJSON} from "./utils";
import uuid from 'uuid';

export const APP_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export const Errors = {
    INVALID_JOB_DATA: 'invalid_job_data'
};

function JSONtoJob(json) {
  json.created_at = new Date(json.created_at);
  json.updated_at = new Date(json.updated_at);
  json.deleted_ad = new Date(json.deleted_ad);

  json.data.max_votes = json.data.maxVotes;
  json.data.num_votes = json.data.numVotes;

  delete json.data.maxVotes;
  delete json.data.numVotes;

  if (json.data.design) {
    json.data.design.forEach(block => {
      // The server may have remove the id of the block, so we generate a new one
      block.id = block.id || uuid();

      // We consider valid blocks that were stored on the server
      block.valid = true;
    });
  } else {
    json.data.design = [];
  }

  return json;
}

function jobToJSON(job) {
  job.data.maxVotes = job.data.max_votes;
  job.data.numVotes = job.data.num_votes;

  delete job.data.max_votes;
  delete job.data.num_votes;

  return job;
}

export default {
  async getJobs() {
    const jsonList = await getJSON(`${APP_URL}/jobs`);
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
    try {
      const json = jobToJSON(job);
      return await putJSON(`${APP_URL}/jobs/${job.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_JOB_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteJob(job) {
    return await sendDelete(`${APP_URL}/jobs/${job.id}`);
  },

  async publish(job, platform) {
    const jsonJob = await postJSON(`${APP_URL}/jobs/${job.id}/publish`, {platform});
    return JSONtoJob(jsonJob);
  }

}
