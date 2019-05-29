import {getJSON} from "./utils";
import {API_URL} from "../../config";

const USERS_URL = `${API_URL}/users`;

const JSONtoUser = ({id, data}) => ({
  id,
  email: data.email,
  imageUrl: data.picture
});

export const USER_SUGGETION_MIN_EMAIL_LENGTH = 4;

export default {
  async findUsersByEmail(email) {
    const jsonList = await getJSON(`${USERS_URL}?email=${email}`);
    return jsonList.map(JSONtoUser);
  },

  async getById(id) {
    const json = await getJSON(`${USERS_URL}/${id}`);
    return JSONtoUser(json);
  }
};
