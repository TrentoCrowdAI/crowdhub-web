import {expectFetchToHaveBeenCalledWith, mockFetchToReturnJson} from "../../testHelpers/services";
import {serverUsers, serviceUsers} from "../../mock-data/users";
import {API_URL} from "../../config";
import UsersService from "./UsersService";

describe('search users by email', () => {

  it('should send a GET to /users?email=', async () => {
    // given
    mockFetchToReturnJson(serverUsers);

    // when
    const users = await UsersService.findUsersByEmail('servant');

    // then
    expectFetchToHaveBeenCalledWith(`${API_URL}/users?email=servant`);
    expect(users).toEqual(serviceUsers);
  });

});
